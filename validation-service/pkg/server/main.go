package server

import (
	"fmt"
	"log"
	"net/http"
)

// StartServer starts the HTTP server at the specified port
func StartServer(port int) {
	http.HandleFunc("/", handler)
	log.Printf("Starting server at port %v...", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	fmt.Fprint(w, "Hello word")
}
