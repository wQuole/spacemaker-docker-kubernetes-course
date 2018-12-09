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
