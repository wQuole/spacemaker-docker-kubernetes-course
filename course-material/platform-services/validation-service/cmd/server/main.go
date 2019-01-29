package main

import (
	"github.com/spacemakerai/spacemaker-docker-kubernetes-course/validation-service/pkg/server"
)

const (
	port = 8080
)

func main() {
	server.StartServer(port)
}
