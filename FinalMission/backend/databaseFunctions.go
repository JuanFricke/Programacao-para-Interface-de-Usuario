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
		log.Fatalf("Tried to Connect to the database, but failed: %v", err)
	}
	// Test the connection
	if err = db.Ping(); err != nil {
		log.Fatalf("Tried Ping the database, but failed: %v", err)
	}
	log.Println("Connected to the database!")
}

func closeDb() {
	log.Println("Closing database connection")
	db.Close()
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func insertUser(createUserRequest CreateUserRequest) CreateResponse {
	//TODO : IMPLEMENT VERIFICATION TO SEE IF THE USER ALREADY EXISTS, MAYBE CHANGE THE PRIMARY TO EMAIL

	sqlQuery := `
		INSERT INTO users (username, password, email) 
		VALUES ($1, $2, $3)
	`

	initDb()

	_, err := db.Exec(sqlQuery, createUserRequest.Username, createUserRequest.Password, createUserRequest.Email)

	if err != nil {
		log.Fatal(err)
		return CreateResponse{StatusCode: 500, Status: err.Error()}
	}

	closeDb()
	return CreateResponse{StatusCode: 200, Status: "Success"}
}

func checkUser(userRequest LoginRequest) LoginResponse {

	sql := fmt.Sprintf(`
	SELECT * FROM users WHERE email = '%s'
	`, userRequest.Email)

	initDb()

	rows, err := db.Query(sql)

	if err != nil {
		log.Fatal(err)
		return LoginResponse{StatusCode: 500, UserId: 0}
	}
	defer rows.Close()

	var response LoginResponse
	if rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			return LoginResponse{StatusCode: 500, Error: "Failed to parse user data"}
		}

		response = LoginResponse{StatusCode: 200, UserId: user.ID}
	} else {
		log.Print("User not found")
		response = LoginResponse{StatusCode: 500, Error: "User not found"}
	}

	closeDb()
	return response
}

func selectProjects(projectRequest ProjectRequest) []Project {
	sql := fmt.Sprintf(`
    SELECT * FROM projects WHERE user_id = %d
    `, projectRequest.UserID)

	initDb()

	rows, err := db.Query(sql)

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
