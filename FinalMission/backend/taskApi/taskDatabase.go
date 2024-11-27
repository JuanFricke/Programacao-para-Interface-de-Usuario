package taskApi

import (
	"backend/dbConnection"
	"log"
)

func insertTask(taskRequest createTaskRequest) (int, error) {
	db := dbConnection.Db()
	sqlQuery := `
		INSERT INTO tasks (title, description, status, project_id, color) 
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
	`

	var newTaskID int
	err := db.QueryRow(sqlQuery, taskRequest.Title, taskRequest.Description, taskRequest.Status, taskRequest.ProjectID, taskRequest.Color).Scan(&newTaskID)

	if err != nil {
		log.Fatalf("Error executing query: %s, Error: %v", sqlQuery, err)
		return 0, err
	}

	return newTaskID, nil

}

func selectTasks(request getTaskRequest) ([]task, []task, []task, error) {
	db := dbConnection.Db()
	sqlQuery := `
		SELECT id, title, description, status, project_id, color 
		FROM tasks
		WHERE project_id = $1
	`

	// Inicializa a conexão com o banco de dados

	rows, err := db.Query(sqlQuery, request.ProjectID)

	if err != nil {
		log.Printf("Error executing query: %s, Error: %v", sqlQuery, err)
		return nil, nil, nil, err
	}
	defer rows.Close()

	var Donetasks []task
	var Doingtasks []task
	var Todotasks []task

	for rows.Next() {
		var task task
		err := rows.Scan(&task.ID, &task.Title, &task.Description, &task.Status, &task.ProjectID, &task.Color)
		if err != nil {
			log.Printf("Error scanning rows: %v", err)
			return nil, nil, nil, err
		}

		switch task.Status {
		case "done":
			Donetasks = append(Donetasks, task)
		case "todo":
			Todotasks = append(Todotasks, task)
		case "doing":
			Doingtasks = append(Doingtasks, task)
		}
	}
	return Donetasks, Doingtasks, Todotasks, nil

}
