package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/spacemakerai/spacemaker-docker-kubernetes-course/validation-service/pkg/model"
)

// StartServer starts the HTTP server at the specified port
func StartServer(port int) {
	http.HandleFunc("/", handleRoot)
	http.HandleFunc("/validate-polygon", handleValidatePolygon)
	log.Printf("Starting server at port %v...", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	fmt.Fprint(w, "Hello word")
}

func handleValidatePolygon(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var p model.Polygon
	if err := decoder.Decode(&p); err != nil {
		http.Error(w, "Could not deserialize polygon", http.StatusBadRequest)
		return
	}
	isValid, errorMessage := model.IsValid(&p)
	response := validatePolygonResponse{
		IsValid:      isValid,
		ErrorMessage: errorMessage,
	}
	responseJSON, _ := json.Marshal(response)
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
}
