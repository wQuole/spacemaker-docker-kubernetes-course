package model

import (
	"encoding/json"
)

// Building represents a building on the map
type Building struct {
	X  int     `json:"x"`
	Y  int     `json:"y"`
	Dx int     `json:"dx"`
	Dy int     `json:"dy"`
	Dz float64 `json:"dz"`
}

// ParseBuilding decodes a JSON string and unmarshals it into the Building struct
func ParseBuilding(s string) (*Building, error) {
	var b Building
	if err := json.Unmarshal([]byte(s), &b); err != nil {
		return nil, err
	}
	return &b, nil
}

// IsValid checks if a polygon is valid, and returns an error string in case it's invalid
func (b *Building) IsValid() (bool, string) {
	if b.X < 0 {
		return false, "Building x less than 0"
	}
	if b.Y < 0 {
		return false, "Building y less than 0"
	}
	if b.Dx < 1 {
		return false, "Building dx less than 1"
	}
	if b.Dy < 1 {
		return false, "Building dy less than 1"
	}
	if b.Dz < 1 {
		return false, "Building dz less than 1"
	}
	if b.X+b.Dx > 99 {
		return false, "Building outside bounds (x + dx > 99)"
	}
	if b.Y+b.Dy > 99 {
		return false, "Building outside bounds (y + dy > 99)"
	}
	if b.Dz > 9 {
		return false, "Building too tall (dz > 9)"
	}
	if b.Dx > 19 {
		return false, "Building too large (dx > 19)"
	}
	if b.Dy > 19 {
		return false, "Building too large (dy > 19)"
	}
	return true, ""
}

// Overlaps return a boolean whether one building overlaps another
func (b *Building) Overlaps(b1 *Building, buffer int) bool {
	if b.X > b1.X+b1.Dx+buffer || b.X+b.Dx+buffer < b1.X {
		return false
	}
	if b.Y > b1.Y+b1.Dy+buffer || b.Y+b.Dy+buffer < b1.Y {
		return false
	}
	return true
}
