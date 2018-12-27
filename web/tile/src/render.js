const tileSizeX = 100;
const tileSizeY = 50;
const borderX = 10;
const borderY = 10;

const maxSizeX = 200;

let scene, renderer, camera, controls;

export function run(tiles) {
  init();
  animate();
  update(tiles);
}

export function update(tiles) {
  clearScene();

  // scene.add(createGrid());
  const sun = createSun();
  scene.add(sun);
  // scene.add(new THREE.CameraHelper(sun.shadow.camera));
  scene.add(createTiles(tiles));
}

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 400;
  camera.position.x = 600;
  camera.position.y = 600;
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera);
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

function createGround(width, height) {
  const texture = new THREE.TextureLoader().load("assets/tarmac.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  const material = new THREE.MeshLambertMaterial({
    // map: texture,
    color: new THREE.Color(0xcccccc),
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    material
  );
  plane.position.x = width / 2;
  plane.position.y = height / 2;
  plane.receiveShadow = true;

  return plane;
}

function createTiles(tiles) {
  let tileX = 0,
    tileY = 0;
  const city = new THREE.Group();
  for (let [service, tile] of Object.entries(tiles)) {
    const block = new THREE.Group();

    block.position.x = tileX;
    block.position.y = tileY;
    block.position.z = 0;
    block.castShadow = true;
    block.receiveShadow = true;

    block.add(createGround(tileSizeX, tileSizeY));
    for (let building of tile) {
      block.add(createBuilding(building));
    }

    tileX = tileX + tileSizeX + borderX;
    if (tileX + tileSizeX > maxSizeX) {
      tileX = 0;
      tileY = tileY + tileSizeY + borderY;
    }

    city.add(block);
  }

  city.castShadow = true;
  city.receiveShadow = true;

  return city;
}

function createSun() {
  //Create a PointLight and turn on shadows for the light
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
  return light;
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
