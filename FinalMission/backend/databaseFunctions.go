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
	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found, using system environment variables")
	}
}

func initDb() {
	loadEnv()

	// Obtém e valida as variáveis de ambiente
	requiredEnvVars := []string{"POSTGRES_HOST", "POSTGRES_PORT", "POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_DB", "POSTGRES_SSLMODE"}
	for _, envVar := range requiredEnvVars {
		if os.Getenv(envVar) == "" {
			log.Fatalf("Environment variable %s is missing", envVar)
		}
	}

	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_PORT"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
		os.Getenv("POSTGRES_SSLMODE"),
	)

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to open DB connection: %v", err)
	}

	if err = db.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	log.Println("Successfully connected to the database!")
}

func closeDb() {
	log.Println("Closing database connection")
	db.Close()
}

func insertUser(createUserRequest CreateUserRequest) (int, error) {
	/*sqlQuery := `
		INSERT INTO users (username, password, email) 
		VALUES ($1, $2, $3)
		RETURNING id
	`*/
	sqlQuery := `
		INSERT INTO users (username, password, email) 
		VALUES ($1, (select encode(hmac($2, '', 'md5'), 'base64')), $3)
		RETURNING id
	`

	var userID int
	err := db.QueryRow(sqlQuery, createUserRequest.Username, createUserRequest.Password, createUserRequest.Email).Scan(&userID)
	if err != nil {
		log.Printf("Error executing query: %s, Error: %v", sqlQuery, err)
		return 0, err
	}

	log.Printf("Successfully inserted user: %v with ID %d", createUserRequest.Username, userID)
	return userID, nil
}

func selectProjects(projectRequest ProjectRequest) []Project {
	sqlQuery := `
		SELECT title, description, status, user_id, color 
		FROM projects 
		WHERE user_id = $1
		`

	rows, err := db.Query(sqlQuery, projectRequest.UserID)
	if err != nil {
		log.Printf("Error executing query: %s, Error: %v", sqlQuery, err)
		return nil
	}
	defer rows.Close()

	var projects []Project
	for rows.Next() {
		var project Project
		if err := rows.Scan(&project.Title, &project.Description, &project.Status, &project.UserID, &project.Color); err != nil {
			log.Printf("Error scanning row: %v", err)
			return nil
		}
		projects = append(projects, project)
	}
	return projects
}

func selectTasks(projectID int) []Task {
	sqlQuery := `
    SELECT id, title, description, status, project_id 
    FROM tasks 
    WHERE project_id = $1
    `

	rows, err := db.Query(sqlQuery, projectID)
	if err != nil {
		log.Printf("Error executing query: %s, Error: %v", sqlQuery, err)
		return nil
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var task Task
		if err := rows.Scan(&task.ID, &task.Title, &task.Description, &task.Status, &task.ProjectID); err != nil {
			log.Printf("Error scanning row: %v", err)
			return nil
		}
		tasks = append(tasks, task)
	}
	return tasks
}
