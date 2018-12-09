package model

import (
	"encoding/json"
)

// Polygon represents a polygon on the map
type Polygon struct {
	X        int     `json:"x"`
	Y        int     `json:"y"`
	Width    int     `json:"width"`
	Depth    int     `json:"depth"`
	Rotation float64 `json:"rotation"`
}

// GetPolygonFromJSON decodes a JSON string and unmarshals it into the Polygon struct
func GetPolygonFromJSON(s string) (*Polygon, error) {
	p := new(Polygon)
	if err := json.Unmarshal([]byte(s), p); err != nil {
		return nil, err
	}
	return p, nil
}

// IsValid checks if a polygon is valid, and returns an error string in case it's invalid
func IsValid(p *Polygon) (bool, string) {
	x1 := p.X
	x2 := x1 + p.Width
	y1 := p.Y
	y2 := y1 + p.Depth
	if x1 < 0 || x2 < 0 || y1 < 0 || y2 < 0 {
		return false, "Polygon is outside bounds"
	}
	if x1 > 100 || x2 > 100 || y1 > 100 || y2 > 100 {
		return false, "Polygon is outside bounds"
	}
	return true, ""
}
