package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}
func initDb() {
	loadEnv()

	// Obtém as variáveis de ambiente carregadas do .env
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPort := os.Getenv("POSTGRES_PORT")
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbSslMode := os.Getenv("POSTGRES_SSLMODE")

	// Monta a string de conexão
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", dbHost, dbPort, dbUser, dbPassword, dbName, dbSslMode)

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to open DB connection: %v", err)
	}

	// Testa a conexão com o banco de dados
	if err = db.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}
	log.Println("Successfully connected to the database!")
}

func closeDb() {
	log.Println("Closing database connection")
	db.Close()
}

func insertUser(createUserRequest CreateUserRequest) sql.Result {
	sqlQuery := `
		INSERT INTO users (username, password, email) 
		VALUES ($1, $2, $3)
	`

	// Executa a consulta de inserção
	result, err := db.Exec(sqlQuery, createUserRequest.Username, createUserRequest.Password, createUserRequest.Email)

	if err != nil {
		log.Printf("Error executing query: %s, Params: %v, Error: %v", sqlQuery, createUserRequest, err)
		return nil
	}

	log.Printf("Successfully inserted user: %v", createUserRequest.Username)
	return result
}

func selectProjects(projectRequest ProjectRequest) []Project {
	sql := fmt.Sprintf(`
    SELECT * FROM projects WHERE user_id = %d
    `, projectRequest.UserID)

	initDb()

	rows, err := db.Query(sql, projectRequest.UserID)

	if err != nil {
		log.Fatal(err)
		return nil
	}
	defer rows.Close()

	closeDb()

	var projects []Project

	for rows.Next() {
		var project Project
		err := rows.Scan(&project.Title, &project.Description, &project.Status, &project.UserID, &project.Color)
		if err != nil {
			return nil
		}
		projects = append(projects, project)
	}

	return projects
}

func selectTasks(ProjectID int) []Task {
	sql := fmt.Sprintf(`
    SELECT * FROM tasks WHERE project_id = %d
    `, ProjectID)

	print(sql)
	return []Task{}
}
