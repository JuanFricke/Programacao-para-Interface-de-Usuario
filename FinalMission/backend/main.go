// main.go
package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    router := mux.NewRouter()

    // router.HandleFunc("/api/login/", getBooks).Methods("POST")
    // router.HandleFunc("/api/signup", getBook).Methods("POST")
    // router.HandleFunc("/api/tasks", createBook).Methods("GET")
    // router.HandleFunc("/api/projects", updateBook).Methods("GET")

    log.Println("Server starting on :5000")
    log.Fatal(http.ListenAndServe(":5000", router))
}