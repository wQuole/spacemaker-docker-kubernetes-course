provider "google-beta" {
  project = "spacemaker-kubernetes-workshop"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

resource "google_container_cluster" "cluster" {
  name               = "abakus"
  provider           = "google-beta"
  initial_node_count = 1
}
