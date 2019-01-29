// @flow
import express from "express";
import log from "@spacemakerai/log";
import { find } from "lodash";
import { createProxyServer } from "http-proxy";
import { Client, config as kubeConfig } from "kubernetes-client";
import Promise from "bluebird";
import cors from "cors";
import morgan from "morgan";
import { json } from "body-parser";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import config from "./config";

const proxy = createProxyServer();
const client = new Client({
  config: config.inCluster
    ? kubeConfig.getInCluster()
    : kubeConfig.fromKubeconfig(),
  version: "1.9"
});

const app = express();

app.disable("x-powered-by");
app.use(methodOverride());
app.use(cookieParser());
app.use(cors());
app.use(json({ type: "*/*" })); // treat everything as json
app.use(
  morgan((tokens, req, res) => {
    log.info("request completed", {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      "content-length": tokens.res(req, res, "content-length"),
      "response-time": tokens["response-time"](req, res)
    });
  })
);

app.get("/", async (req, res, next) => {
  try {
    const [deployments, services] = await Promise.all([
      client.apis.apps.v1
        .namespaces(config.serviceNamespace)
        .deployments()
        .get(),
      client.api.v1
        .namespaces(config.serviceNamespace)
        .services()
        .get()
    ]);

    const response = deployments.body.items
      .filter(({ status }) => status.availableReplicas >= 1)
      .map(({ metadata, spec, status }) => ({
        name: metadata.name,
        app: spec.template.metadata.labels.app,
        created: metadata.creationTimestamp,
        replicas: status.replicas,
        availableReplicas: status.availableReplicas,
        readyReplicas: status.readyReplicas
      }))
      .map(deployment => {
        const service = find(services.body.items, [
          "spec.selector.app",
          deployment.app
        ]);

        if (!service) {
          return false;
        }

        return { ...deployment, url: `${config.url}/${service.metadata.name}` };
      })
      .filter(Boolean);

    res.json(response);
  } catch (error) {
    log.error("error", { error });
    next(error);
  }
});

app.use("/:service", async (req, res, next) => {
  try {
    const { body } = await client.api.v1
      .namespaces(config.serviceNamespace)
      .services(req.params.service)
      .get();

    const target = `http://${body.spec.clusterIP}:${
      body.spec.ports[0].targetPort
    }${req.url}`;

    proxy.web(req, res, { target });
  } catch (error) {
    log.error("error", { error });
    next(error);
  }
});

export default app;
