package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/spacemakerai/spacemaker-docker-kubernetes-course/validation-service/pkg/model"
)

const BUFFER = 2

// StartServer starts the HTTP server at the specified port
func StartServer(port int) {
	http.HandleFunc("/", handleRoot)
	http.HandleFunc("/validate-buildings", handleValidateBuildings)
	log.Printf("Starting server at port %v...", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request %v...", r)
	fmt.Fprint(w, "Hello word")
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
	var validationResults []buildingValidationResult
	for _, b := range buildings {
		isValid, errorMessage := b.IsValid()
		validationResults = append(validationResults, buildingValidationResult{
			IsValid:      isValid,
			ErrorMessage: errorMessage,
		})
	}
	isValid := true
	errorMessage := ""
	// check if anyone has validation errors
	for _, b := range validationResults {
		if !b.IsValid {
			isValid = false
			errorMessage = "One or more buildings had validation errors"
		}
	}
	// check for overlap
	for _, b1 := range buildings {
		for _, b2 := range buildings {
			if b1 != b2 && b1.Overlaps(&b2, BUFFER) {
				isValid = false
				errorMessage = "One or more buildings overlap"
			}
		}
	}
	response := validationResult{
		IsValid:           isValid,
		ErrorMessage:      errorMessage,
		ValidationResults: validationResults,
	}
	responseJSON, _ := json.Marshal(response)
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
}
