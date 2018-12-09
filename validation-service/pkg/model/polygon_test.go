package model

import (
	"testing"
)

func TestPolygonParsing(t *testing.T) {
	input := `
		{
			"x": 5,
			"y": 7,
			"width": 2,
			"depth": 3,
			"rotation": 13.37
		}`
	expected := Polygon{
		X:        5,
		Y:        7,
		Width:    2,
		Depth:    3,
		Rotation: 13.37,
	}

	polygon, err := GetPolygonFromJSON(input)
	if err != nil {
		t.Error("got error", err)
	}
	if *polygon != expected {
		t.Error("expected", expected, "got", polygon)
	}
}

func TestIsPolygonValid(t *testing.T) {
	tests := []struct {
		polygon             Polygon
		expectedErrorString string
	}{
		// this thing is obviously on the inside
		{
			Polygon{
				X:        10,
				Y:        10,
				Width:    10,
				Depth:    10,
				Rotation: 0.0,
			},
			"",
		},
		// this thing is obviously on the outside
		{
			Polygon{
				X:        100,
				Y:        100,
				Width:    10,
				Depth:    10,
				Rotation: 0.0,
			},
			"Polygon is outside bounds",
		},
	}

	for _, test := range tests {
		isValid, errorString := IsValid(&test.polygon)
		if isValid {
			if test.expectedErrorString != "" {
				t.Error("Polygon was valid, but expected error", test.expectedErrorString)
			}
		} else {
			if test.expectedErrorString != errorString {
				t.Error("Expected error", test.expectedErrorString, "but got", errorString)
			}
		}
	}
}
