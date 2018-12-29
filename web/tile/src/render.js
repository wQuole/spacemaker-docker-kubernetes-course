import TWEEN from "@tweenjs/tween.js";

const tileSizeX = 100;
const tileSizeY = 50;
const borderX = 10;
const borderY = 10;

const maxSizeY = 300;

let scene, renderer, camera, controls;
const textureLoader = new THREE.TextureLoader();
const assets = {
  tarmac: textureLoader.load("assets/tarmac.jpg")
};

export function run(tiles) {
  init();
  animate();
  update(tiles);
}

export function update(tiles) {
  clearScene();

  scene.add(createSun());
  scene.add(createTiles(tiles));

  moveCamera(tiles, camera, controls);
}

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.x = 200;
  camera.position.y = 35;
  camera.position.z = 100;
  camera.up = new THREE.Vector3(0, 0, 1);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera);
  controls.target = new THREE.Vector3(0, 35, 0);

  window.addEventListener("resize", onWindowResize, false);
}

function clearScene() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
}

function createGrid() {
  const gridHelper = new THREE.GridHelper(tileSizeX, 40, 0x0000ff, 0x808080);
  gridHelper.geometry.rotateX(Math.PI / 2);
  gridHelper.position.x = tileSizeX / 2;
  gridHelper.position.y = tileSizeX / 2;
  return gridHelper;
}

function createBuilding({ x, y, dx, dy, dz }) {
  if (dx < 0) dx = 1;
  if (dy < 0) dy = 1;
  if (dz < 0) dx = 1;
  if (dx + x > tileSizeX) {
    dx = tileSizeX - x;
  }
  if (dy + y > tileSizeY) {
    dy = tileSizeY - y;
  }

  const geometry = new THREE.BoxBufferGeometry(dx, dy, dz);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0xcccccc)
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x + dx / 2;
  mesh.position.y = y + dy / 2;
  mesh.position.z = dz / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

function createGround(width, height, borderWidth, borderHeight) {
  const northTarmac = new THREE.Mesh(
    new THREE.PlaneGeometry(borderWidth, borderHeight + height),
    new THREE.MeshLambertMaterial({
      map: assets.tarmac,
      color: 0xffffff,
      side: THREE.DoubleSide
    })
  );
  northTarmac.position.x = width + borderWidth / 2;
  northTarmac.position.y = (height + borderHeight) / 2;
  northTarmac.receiveShadow = true;

  const vestTarmac = new THREE.Mesh(
    new THREE.PlaneGeometry(width, borderHeight),
    new THREE.MeshLambertMaterial({
      map: assets.tarmac,
      color: 0xffffff,
      side: THREE.DoubleSide
    })
  );
  vestTarmac.position.x = width / 2;
  vestTarmac.position.y = height + borderHeight / 2;
  vestTarmac.receiveShadow = true;

  const block = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshLambertMaterial({
      color: new THREE.Color(0x2a603b),
      side: THREE.DoubleSide
    })
  );
  block.position.x = width / 2;
  block.position.y = height / 2;
  block.receiveShadow = true;

  const group = new THREE.Group();
  group.add(block);
  group.add(northTarmac);
  group.add(vestTarmac);
  return group;
}

const sortedEntries = tiles =>
  Object.entries(tiles).sort(([a], [b]) => a.localeCompare(b));

function createTiles(tiles) {
  let tileX = 0,
    tileY = 0;
  const city = new THREE.Group();
  for (let [service, tile] of sortedEntries(tiles)) {
    const block = new THREE.Group();

    block.position.x = tileX;
    block.position.y = tileY;
    block.position.z = 0;
    block.castShadow = true;
    block.receiveShadow = true;

    block.add(createGround(tileSizeX, tileSizeY, borderX, borderY));
    for (let building of tile) {
      block.add(createBuilding(building));
    }

    tileY = tileY + tileSizeY + borderY;

    if (tileY + tileSizeY > maxSizeY) {
      tileY = 0;
      tileX = tileX + tileSizeX + borderX;
    }

    city.add(block);
  }

  city.castShadow = true;
  city.receiveShadow = true;

  return city;
}

function createSun() {
  //Create a PointLight and turn on shadows for the light
  const ambient = new THREE.AmbientLight(0xf0f0f0, 0.55);
  var light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(100, 200, 100);
  light.castShadow = true;

  //Set up shadow properties for the light
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;

  light.shadow.camera.left = -500;
  light.shadow.camera.bottom = -500;
  light.shadow.camera.right = 500;
  light.shadow.camera.top = 500;

  const group = new THREE.Group();
  group.add(light);
  group.add(ambient);
  // group.add(new THREE.CameraHelper(light.shadow.camera));
  return group;
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  TWEEN.update();

  renderer.render(scene, camera);
}

function moveCamera(tiles, camera, controls) {
  const cols = Math.min(
    Math.floor(maxSizeY / (tileSizeY + borderY)),
    Object.entries(tiles).length
  );
  const rows = Math.max(Math.ceil(Object.entries(tiles).length / cols), 1) || 0;

  const x = (1 + rows) * (tileSizeX + borderX);
  const y = ((tileSizeY + borderY) * (cols - 1) + tileSizeY) / 2;
  const z = 100 + (rows - 1) * 50;
  const position = new THREE.Vector3(x, y, z);
  const target = new THREE.Vector3((rows / 2) * (tileSizeX + borderX), y, 0);

  new TWEEN.Tween(camera.position)
    .to(
      {
        x: position.x,
        y: position.y,
        z: position.z
      },
      600
    )
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();
  new TWEEN.Tween(controls.target)
    .to(
      {
        x: target.x,
        y: target.y,
        z: target.z
      },
      600
    )
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start();

  camera.updateWorldMatrix();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
