// main.go
package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    router := mux.NewRouter()

    router.HandleFunc("/api/books", getBooks).Methods("GET")
    router.HandleFunc("/api/books/{id}", getBook).Methods("GET")
    router.HandleFunc("/api/books", createBook).Methods("POST")
    router.HandleFunc("/api/books/{id}", updateBook).Methods("PUT")
    router.HandleFunc("/api/books/{id}", deleteBook).Methods("DELETE")

    log.Println("Server starting on :8000")
    log.Fatal(http.ListenAndServe(":8000", router))
}
