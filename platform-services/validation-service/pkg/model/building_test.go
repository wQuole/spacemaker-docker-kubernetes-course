package model

import (
	"testing"
)

func TestParseBuilding(t *testing.T) {
	input := `
		{
			"x": 1,
			"y": 2,
			"dx": 3,
			"dy": 4,
			"dz": 5
		}`
	expected := Building{
		X:  1,
		Y:  2,
		Dx: 3,
		Dy: 4,
		Dz: 5,
	}

	polygon, err := ParseBuilding(input)
	if err != nil {
		t.Error("got error", err)
	}
	if *polygon != expected {
		t.Error("expected", expected, "got", polygon)
	}
}

func TestOverlapOverlappingBuffers(t *testing.T) {
	b1 := Building{
		X:  0,
		Y:  0,
		Dx: 1,
		Dy: 1,
		Dz: 1,
	}
	b2 := Building{
		X:  2, // <- too close
		Y:  0,
		Dx: 1,
		Dy: 1,
		Dz: 1,
	}
	if b1.Overlaps(&b2, 2) == false {
		t.Error("Expected overlapping buildings, but got false")
	}
}

func TestIsValid(t *testing.T) {
	tests := []struct {
		building            Building
		expectedErrorString string
	}{
		// this building is obviously on the inside
		{
			Building{
				X:  1,
				Y:  2,
				Dx: 3,
				Dy: 4,
				Dz: 5,
			},
			"",
		},
		{
			Building{
				X:  -1,
				Y:  0,
				Dx: 5,
				Dy: 5,
				Dz: 5,
			},
			"Building x less than 0",
		},
		{
			Building{
				X:  0,
				Y:  -1,
				Dx: 5,
				Dy: 5,
				Dz: 5,
			},
			"Building y less than 0",
		},
		{
			Building{
				X:  0,
				Y:  0,
				Dx: 0,
				Dy: 5,
				Dz: 5,
			},
			"Building dx less than 1",
		},
		{
			Building{
				X:  0,
				Y:  0,
				Dx: 5,
				Dy: 0,
				Dz: 5,
			},
			"Building dy less than 1",
		},
		{
			Building{
				X:  0,
				Y:  0,
				Dx: 5,
				Dy: 5,
				Dz: 0,
			},
			"Building dz less than 1",
		},
		{
			Building{
				X:  90,
				Y:  0,
				Dx: 10,
				Dy: 5,
				Dz: 5,
			},
			"Building outside bounds (x + dx > 99)",
		},
		{
			Building{
				X:  0,
				Y:  20,
				Dx: 5,
				Dy: 122,
				Dz: 5,
			},
			"Building outside bounds (y + dy > 99)",
		},
		{
			Building{
				X:  0,
				Y:  0,
				Dx: 5,
				Dy: 5,
				Dz: 10,
			},
			"Building too tall (dz > 9)",
		},
		{
			Building{
				X:  0,
				Y:  0,
				Dx: 20,
				Dy: 10,
				Dz: 5,
			},
			"Building too large (dx > 19)",
		},
		{
			Building{
				X:  0,
				Y:  0,
				Dx: 10,
				Dy: 25,
				Dz: 5,
			},
			"Building too large (dy > 19)",
		},
	}

	for _, test := range tests {
		isValid, errorString := test.building.IsValid()
		if isValid {
			if test.expectedErrorString != "" {
				t.Error("Building was valid, but expected error", test.expectedErrorString)
			}
		} else {
			if test.expectedErrorString != errorString {
				t.Error("Expected error", test.expectedErrorString, "but got", errorString)
			}
		}
	}
}
