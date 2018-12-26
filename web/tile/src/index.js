import { getAllServices, getServiceResult } from "./services";
import { validate, isValid } from "./validation";
import { analyse } from "./analysis";
import { run, update } from "./render";

const tiles = {};

run(tiles);

async function callService() {
  const services = await getAllServices();

  for (let { name, app } of services) {
    try {
      const block = await getServiceResult(app);

      const validation = await validate(block);
      if (isValid(validation)) {
        tiles[name] = block;
        const score = await analyse(block);
        console.log({ type: "analyse", name, score });
      } else {
        delete tiles[name];
        console.log({ type: "invalid", name, validation });
      }
    } catch (e) {
      delete tiles[name];
      console.log({ type: "error", name, e });
    }
  }

  update(tiles);
  setTimeout(callService, 5000);
}
callService();
