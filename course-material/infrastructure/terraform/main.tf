provider "google-beta" {
  project = "${var.google_project}"
  region  = "${var.google_region}"
  zone    = "${var.google_zone}"
}

provider "aws" {
  region = "eu-west-1"
}

terraform {
  backend "gcs" {
    bucket  = "main-europe-west1-terraform"
    project = "spacemaker-kubernetes-workshop"
    prefix  = "spacemaker-docker-kubernetes-course"
  }
}

data "google_container_engine_versions" "region" {
  project = "${var.google_project}"
  zone    = "${var.google_zone}"
}

resource "google_container_cluster" "cluster" {
  name               = "${var.cluster_name}"
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

resource "google_compute_address" "load_balancer" {
  project = "${var.google_project}"
  name    = "k8s-${var.cluster_name}-load-balancer"
  region  = "${var.google_region}"
}

resource "aws_route53_record" "load_balancer_a" {
  zone_id = "${var.route53_zone_id}"
  name    = "${var.cluster_name}.${var.route53_domain_name}"
  type    = "A"
  ttl     = 3600

  records = ["${google_compute_address.load_balancer.address}"]
}
