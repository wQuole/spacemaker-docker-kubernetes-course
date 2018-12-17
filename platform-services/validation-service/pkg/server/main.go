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
	http.HandleFunc("/validate-building", handleValidateBuilding)
	http.HandleFunc("/validate-buildings", handleValidateBuildings)
	log.Printf("Starting server at port %v...", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	fmt.Fprint(w, "Hello word")
}

func handleValidateBuilding(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var b model.Building
	if err := decoder.Decode(&b); err != nil {
		http.Error(w, "Could not deserialize building", http.StatusBadRequest)
		return
	}
	isValid, errorMessage := b.IsValid()
	response := buildingValidationResult{
		IsValid:      isValid,
		ErrorMessage: errorMessage,
	}
	responseJSON, _ := json.Marshal(response)
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
}

func handleValidateBuildings(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var buildings []model.Building
	if err := decoder.Decode(&buildings); err != nil {
		http.Error(w, "Could not deserialize building", http.StatusBadRequest)
		return
	}
	var response []buildingValidationResult
	for _, b := range buildings {
		isValid, errorMessage := b.IsValid()
		response = append(response, buildingValidationResult{
			IsValid:      isValid,
			ErrorMessage: errorMessage,
		})
	}
	responseJSON, _ := json.Marshal(response)
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
}
