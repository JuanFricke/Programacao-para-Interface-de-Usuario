package main

import (
	"backend/dbConnection"
	"backend/projectsApi"
	"backend/taskApi"
	"backend/userApi"
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
	dbConnection.InitDb()
	defer dbConnection.CloseDb() // Garantir que o banco de dados seja fechado quando o servidor for interrompido

	// Define as rotas
	router.HandleFunc("/api", apiOk).Methods("GET")
	// User Routes
	router.HandleFunc("/api/login", userApi.LoginUser).Methods("POST")
	router.HandleFunc("/api/signup", userApi.SignupUser).Methods("POST")
	// Tasks Routes
	router.HandleFunc("/api/add/task", taskApi.AddTask).Methods("POST")
	router.HandleFunc("/api/get/tasks", taskApi.GetTasks).Methods("GET")
	// Projects Routes
	router.HandleFunc("/api/get/projects", projectsApi.GetProjects).Methods("GET")
	router.HandleFunc("/api/add/project", projectsApi.AddProject).Methods("POST")

	// Inicia o servidor
	log.Println("Server starting on :5000")
	log.Fatal(http.ListenAndServe(":5000", router))
}
