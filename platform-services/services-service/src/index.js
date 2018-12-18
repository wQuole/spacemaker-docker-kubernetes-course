import '@babel/polyfill'
import log from "@spacemakerai/log";
import app from "./app";
import config from "./config";

log.info("server starting", {
  port: config.port,
  env: config.env
});

app.listen(config.port, () => {
  log.info("server listening", {
    port: config.port,
    env: config.env
  });
});
