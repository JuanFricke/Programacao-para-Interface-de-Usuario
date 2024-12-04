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
	router.HandleFunc("/api/get/project/tasks/{id}", taskApi.GetTasksByProject).Methods("GET")
	router.HandleFunc("/api/get/user/tasks/{id}", taskApi.GetTasksByUser).Methods("GET")
	// Projects Routes
	router.HandleFunc("/api/get/projects/{id}", projectsApi.GetProjects).Methods("GET")
	router.HandleFunc("/api/add/project", projectsApi.AddProject).Methods("POST")

	// Inicia o servidor
	log.Println("Server starting on :5000")
	log.Fatal(http.ListenAndServe("0.0.0.0:5000", enableCORS(router)))
}

func enableCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*") // Permitir todas as origens. Para maior segurança, substitua "*" pelo domínio específico.
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        // Para requisições pré-fligth
        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusOK)
            return
        }

        next.ServeHTTP(w, r)
    })
}
