package server

type validationResult struct {
	IsValid           bool                       `json:"isValid"`
	ErrorMessage      string                     `json:"errorMessage"`
	ValidationResults []buildingValidationResult `json:"validationResults"`
}

type buildingValidationResult struct {
	IsValid      bool   `json:"isValid"`
	ErrorMessage string `json:"errorMessage"`
}
