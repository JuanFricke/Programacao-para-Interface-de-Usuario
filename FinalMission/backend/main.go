package main

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {
	// Inicia o roteador
	router := mux.NewRouter()

	// Configura o arquivo de log
	logFile, err := os.OpenFile("application.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatalf("Error opening log file: %v", err)
	}
	defer logFile.Close()
	multiWriter := io.MultiWriter(os.Stdout, logFile)
	log.SetOutput(multiWriter)

	// Teste de inicialização do banco de dados
	initDb()
	defer closeDb() // Garantir que o banco de dados seja fechado quando o servidor for interrompido

	// Define as rotas
	router.HandleFunc("/api/projects", getUserProjects).Methods("POST")
	router.HandleFunc("/api", apiOk).Methods("GET")
	router.HandleFunc("/api/login", loginUser).Methods("POST")
	router.HandleFunc("/api/signup", createUser).Methods("POST")
	router.HandleFunc("/api/newTask", newTask).Methods("POST")
	router.HandleFunc("/api/getTasks", getTasks).Methods("GET")

	// Inicia o servidor
	log.Println("Server starting on :5000")
	log.Fatal(http.ListenAndServe(":5000", router))
}
