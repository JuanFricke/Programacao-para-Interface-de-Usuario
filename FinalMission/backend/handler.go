// handler.go
package main

import (
	"encoding/json"
	"net/http"
)

func apiOk(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "API is running"})
}
