## Terraforming the Kubernetes Cluster

To terraform the Kubernetes cluster, the environment needs to point at the GCP
credentials:

```bash
$ export GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/client-secret.json
```

Then run Terraform:

```bash
$ terraform apply
```
