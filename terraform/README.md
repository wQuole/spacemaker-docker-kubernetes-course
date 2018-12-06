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

To install NGINX ingress, run the below command. Remember to set up the cluster
context first.

```bash
$ kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user $(gcloud config get-value account)
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml
```
