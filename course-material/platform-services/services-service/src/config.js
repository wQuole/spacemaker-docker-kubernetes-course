export default {
  port: Number(process.env.PORT) || 8000,
  inCluster: process.env.IN_CLUSTER,
  env: process.env.NODE_ENV || "development",
  url: process.env.URL || "http://localhost:8000",
  serviceNamespace: process.env.SERVICES_NAMESPACE || "default"
};
