package projectsApi

import (
	"backend/dbConnection"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func checkDBConnection() *sql.DB {
	db := dbConnection.Db()
	if db == nil {
		log.Fatal("Database connection is nil")
	}
	return db
}

func checkProjectExists(projectID int, projectTitle string) bool {
	db := checkDBConnection()
	sql := "SELECT id FROM projects WHERE id = $1 AND title = $2"
	var id int
	err := db.QueryRow(sql, projectID, projectTitle).Scan(&id)

	if err != nil {
		log.Fatal(err)
		return false
	}

	return true
}

func selectProjects(projectRequest getProjectsRequest) ([]Project, []Project, []Project) {
	db := checkDBConnection()
	if db == nil {
		return nil, nil, nil
	}

	// TODO check if the user exists

	sql := "SELECT * FROM projects WHERE user_id = $1"
	rows, err := db.Query(sql, projectRequest.UserID)

	if err != nil {
		log.Fatal(err)
		return nil, nil, nil
	}

	defer rows.Close()

	var madeProjects []Project
	var todoProjects []Project
	var doingProjects []Project

	for rows.Next() {
		var project Project
		err := rows.Scan(&project.ID, &project.Title, &project.Description, &project.Status, &project.UserID, &project.Color)
		if err != nil {
			log.Fatal(err)
			return nil, nil, nil
		}

		// Categorize project based on its status
		switch project.Status {
		case "made":
			madeProjects = append(madeProjects, project)
		case "todo":
			todoProjects = append(todoProjects, project)
		case "doing":
			doingProjects = append(doingProjects, project)
		}
	}

	return madeProjects, todoProjects, doingProjects
}

func insertProject(projectRequest addProjectRequest) addProjectResponse {
	db := dbConnection.Db()
	if db == nil {
		log.Fatal("Database connection is nil")
		return addProjectResponse{StatusCode: 500, Status: "Database connection error"}
	}
	if checkProjectExists(projectRequest.UserID, projectRequest.Title) {
		return addProjectResponse{StatusCode: 500, Status: "Project Already Exists"}
	}
	// TODO : ADD VERIFICATION TO SEE IF THE USER EXISTS
	sql := "INSERT INTO projects (user_id, title, description, status, color) VALUES ($1, $2, $3, $4, $5) RETURNING id"
	var id int
	err := db.QueryRow(sql, projectRequest.UserID, projectRequest.Title, projectRequest.Description, projectRequest.Status, projectRequest.Color).Scan(&id)
	if err != nil {
		log.Fatal(err)
		return addProjectResponse{StatusCode: 500, Status: "Error inserting project"}
	}
	return addProjectResponse{ProjectId: id, StatusCode: 200, Status: fmt.Sprintf(`Project with name ${projectRequest.Title} inserted successfully`)}
}
