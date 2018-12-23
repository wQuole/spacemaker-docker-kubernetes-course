import { getAllServices, getServiceResult } from "./service";

let scene,
  tiles = {};

let tileSizeX = 100;
let tileSizeY = 50;
let borderX = 10;
let borderY = 10;

let maxSizeX = 200;
let update;
function run() {
  let renderer, camera, controls;

  init();
  animate();
  updateScene(tiles);

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

  function computeBlockPosition({ tileX, tileY }) {
    let nextTileX = tileX + tileSizeX + borderX;
    let nextTileY = tileY;
    if (nextTileX + tileSizeX > maxSizeX) {
      nextTileX = 0;
      nextTileY = tileY + tileSizeY + borderY;
    }
    return { nextTileX, nextTileY };
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
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xcccccc)
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x + dx / 2;
    mesh.position.y = y + dy / 2;
    mesh.position.z = dz / 2;

    return mesh;
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

      for (let building of tile) {
        console.log({ tileX, tileY });
        block.add(createBuilding(building));
      }

      let { nextTileX, nextTileY } = computeBlockPosition({ tileX, tileY });
      tileX = nextTileX;
      tileY = nextTileY;

      city.add(block);
    }

    return city;
  }

  function updateScene(tiles) {
    clearScene();

    scene.add(createGrid());
    scene.add(createTiles(tiles));
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  update = updateScene;
}

run();

async function callService() {
  const services = await getAllServices();

  for (let { name, app } of services) {
    try {
      const result = await getServiceResult(app);
      tiles[name] = result;
    } catch (e) {
      delete tiles[name];
      console.log({ name, e });
    }
  }

  update(tiles);
}
callService();
setTimeout(callService, 5000);
