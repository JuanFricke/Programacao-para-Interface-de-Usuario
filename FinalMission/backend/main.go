// main.go
package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/login", login).Methods("POST")
	router.HandleFunc("/api/signup", signup).Methods("POST")
	// router.HandleFunc("/api/tasks", createBook).Methods("GET")
	router.HandleFunc("/api/projects", getUserProjects).Methods("POST")

	log.Println("Server starting on :5000")
	log.Fatal(http.ListenAndServe(":5000", router))
}
