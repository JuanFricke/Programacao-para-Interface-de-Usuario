package projectsApi

import (
	"backend/dbConnection"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func checkProjectExists(userID int, projectTitle string) bool {
	db := dbConnection.Db()
	sql := "SELECT id FROM projects WHERE user_id = $1 AND title = $2"
	var id int
	err := db.QueryRow(sql, userID, projectTitle).Scan(&id)

	if err != nil {
		return false
	}

	return true
}

func selectProjects(projectRequest getProjectsRequest) ([]Project, []Project, []Project) {
	db := dbConnection.Db()
	if db == nil {
		return nil, nil, nil
	}

	// TODO check if the user exists

	sql := "SELECT * FROM projects WHERE user_id = $1"
	rows, err := db.Query(sql, projectRequest.UserID)

	if err != nil {
		log.Print(err)
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
			log.Print(err)
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
		log.Print("Database connection is nil")
		return addProjectResponse{StatusCode: 500, Status: "Database connection error"}
	}
	log.Print("Verifing if project Exists")
	if checkProjectExists(projectRequest.UserID, projectRequest.Title) {
		return addProjectResponse{StatusCode: 500, Status: "Project Already Exists"}
	}
	log.Print("Project doesn't exist, Inserting Project")
	// TODO : ADD VERIFICATION TO SEE IF THE USER EXISTS
	sql := "INSERT INTO projects (user_id, title, description, status, color) VALUES ($1, $2, $3, $4, $5) RETURNING id"
	var id int
	err := db.QueryRow(sql, projectRequest.UserID, projectRequest.Title, projectRequest.Description, projectRequest.Status, projectRequest.Color).Scan(&id)
	if err != nil {
		log.Print(err)
		return addProjectResponse{StatusCode: 500, Status: "Error inserting project"}
	}
	log.Print("Project inserted successfully")
	return addProjectResponse{ProjectId: id, StatusCode: 200, Status: fmt.Sprintf(`Project with name %v inserted successfully`, projectRequest.Title)}
}
