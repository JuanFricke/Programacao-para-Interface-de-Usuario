package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// Handler para a rota /api/newTask
func newTask(w http.ResponseWriter, r *http.Request) {
	var taskRequest NewTaskRequest

	// Decodifica o corpo da requisição JSON para a estrutura NewTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&taskRequest); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Printf("Failed to decode request body: %v", err)
		return
	}

	sqlQuery := `
		INSERT INTO tasks (title, description, status, project_id, color) 
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
	`

	// Inicializa a conexão com o banco de dados
	initDb()
	defer closeDb()

	var newTaskID int
	err := db.QueryRow(sqlQuery, taskRequest.Title, taskRequest.Description, taskRequest.Status, taskRequest.ProjectID, taskRequest.Color).Scan(&newTaskID)

	if err != nil {
		http.Error(w, "Failed to insert task", http.StatusInternalServerError)
		log.Printf("Error executing query: %s, Params: %+v, Error: %v", sqlQuery, taskRequest, err)
		return
	}

	// Cria a resposta com os dados da nova tarefa
	response := NewTaskResponse{
		ID:          newTaskID,
		Title:       taskRequest.Title,
		Description: taskRequest.Description,
		Status:      taskRequest.Status,
		ProjectID:   taskRequest.ProjectID,
		Color:       taskRequest.Color,
	}

	// Envia a resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func getTasks(w http.ResponseWriter, r *http.Request) {
	sqlQuery := `
		SELECT id, title, description, status, project_id, color 
		FROM tasks
	`

	// Inicializa a conexão com o banco de dados
	initDb()
	defer closeDb()

	rows, err := db.Query(sqlQuery)
	if err != nil {
		http.Error(w, "Failed to retrieve tasks", http.StatusInternalServerError)
		log.Printf("Error executing query: %s, Error: %v", sqlQuery, err)
		return
	}
	defer rows.Close()

	var tasks []NewTaskResponse

	for rows.Next() {
		var task NewTaskResponse
		err := rows.Scan(&task.ID, &task.Title, &task.Description, &task.Status, &task.ProjectID, &task.Color)
		if err != nil {
			http.Error(w, "Failed to parse tasks", http.StatusInternalServerError)
			log.Printf("Error scanning rows: %v", err)
			return
		}
		tasks = append(tasks, task)
	}

	// Envia a resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(tasks); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
