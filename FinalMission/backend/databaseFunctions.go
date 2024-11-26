package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var db *sql.DB

func initDb() {
	var err error
	// Example connection string: "postgres://username:password@localhost/dbname?sslmode=disable"
	connStr := "host=finalmission-postgres-1 port=5432 user=admin password=admin dbname=database sslmode=disable"
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

func insertUser(createUserRequest CreateUserRequest) sql.Result {
	sql := fmt.Sprintf(`
	INSERT INTO users (username, password, email) VALUES ('%s', '%s', '%s')
	`, createUserRequest.Username, createUserRequest.Password, createUserRequest.Email)

	initDb()

	result, err := db.Exec(sql)

	if err != nil {
		log.Fatal(err)
		return nil
	}
	log.Printf("User inserted: %v", result)

	closeDb()

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
