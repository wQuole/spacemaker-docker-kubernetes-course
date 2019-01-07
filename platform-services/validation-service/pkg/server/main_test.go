package server

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"testing"
)

func TestValidateBuldingsValid(t *testing.T) {
	input := `[
		{
			"x": 0,
			"y": 0,
			"dx": 1,
			"dy": 1,
			"dz": 1
		},
		{
			"x": 10,
			"y": 10,
			"dx": 2,
			"dy": 2,
			"dz": 2
		}
	]`

	expected := `
		{
			"isValid": true,
			"errorMessage": "",
			"validationResults": [
				{
					"isValid": true,
					"errorMessage": ""
				},
				{
					"isValid": true,
					"errorMessage": ""
				}
			]
		}
	`
	assertValidateBuildings(input, expected, t)
}
func TestValidateBuldingsOneInvalidBuilding(t *testing.T) {
	input := `[
		{
			"x": 0,
			"y": 0,
			"dx": 1,
			"dy": 1,
			"dz": 1
		},
		{
			"x": 10,
			"y": 100,
			"dx": 2,
			"dy": 2,
			"dz": 2
		}
	]`

	expected := `
		{
			"isValid": false,
			"errorMessage": "One or more buildings had validation errors",
			"validationResults": [
				{
					"isValid": true,
					"errorMessage": ""
				},
				{
					"isValid": false,
					"errorMessage": "Building outside bounds (y + dy > 99)"
				}
			]
		}
	`
	assertValidateBuildings(input, expected, t)
}

func TestValidateBuldingsOverlapping(t *testing.T) {
	input := `[
		{
			"x": 0,
			"y": 0,
			"dx": 10,
			"dy": 10,
			"dz": 1
		},
		{
			"x": 5,
			"y": 5,
			"dx": 10,
			"dy": 10,
			"dz": 1
		}
	]`

	expected := `
		{
			"isValid": false,
			"errorMessage": "One or more buildings overlap",
			"validationResults": [
				{
					"isValid": true,
					"errorMessage": ""
				},
				{
					"isValid": true,
					"errorMessage": ""
				}
			]
		}
	`
	assertValidateBuildings(input, expected, t)
}

func assertValidateBuildings(input string, expected string, t *testing.T) {
	req, err := http.NewRequest("POST", "/", strings.NewReader(input))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handleValidateBuildings)
	handler.ServeHTTP(rr, req)
	isEqual, err := isEqualJSON(rr.Body.String(), expected)
	if err != nil {
		t.Error("Unable to compare json strings", err)
	}
	if !isEqual {
		t.Error("Got", rr.Body.String(), "expected", expected)
	}

}

func isEqualJSON(s1, s2 string) (bool, error) {
	var o1 interface{}
	var o2 interface{}

	err := json.Unmarshal([]byte(s1), &o1)

	if err != nil {
		return false, err
	}

	err = json.Unmarshal([]byte(s2), &o2)

	if err != nil {
		return false, err
	}
	return reflect.DeepEqual(o1, o2), nil
}
