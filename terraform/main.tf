provider "google-beta" {
  project = "spacemaker-kubernetes-workshop"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

data "google_container_engine_versions" "region" {
  project = "spacemaker-kubernetes-workshop"
  zone    = "europe-west1-b"
}

resource "google_container_cluster" "cluster" {
  name               = "abakus"
  provider           = "google-beta"
  initial_node_count = 1
  min_master_version = "${data.google_container_engine_versions.region.latest_master_version}"
  node_version       = "${data.google_container_engine_versions.region.latest_node_version}"

  lifecycle {
    ignore_changes = [
      "min_master_version",
      "node_version",
    ]
  }
}
