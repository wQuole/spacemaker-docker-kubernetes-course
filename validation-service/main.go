package main

import (
	"fmt"
	"log"
	"net/http"
)

const (
	port = 8080
)

func handler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	fmt.Fprint(w, "Hello word")
}

func main() {
	http.HandleFunc("/", handler)
	log.Printf("Starting server at port %v...", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}
