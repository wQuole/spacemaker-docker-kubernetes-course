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
