package taskApi

import (
	"encoding/json"
	"log"
	"net/http"
)

// Handler para a rota /api/newTask
func AddTask(w http.ResponseWriter, r *http.Request) {
	var taskRequest createTaskRequest

	// Decodifica o corpo da requisição JSON para a estrutura NewTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&taskRequest); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Printf("Failed to decode request body: %v", err)
		return
	}

	newTaskID, err := insertTask(taskRequest)

	if err != nil {
		http.Error(w, "Failed to insert task", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		return
	}

	// Cria a resposta com os dados da nova tarefa
	response := createTaskResponse{
		TaskId:     newTaskID,
		StatusCode: http.StatusCreated,
	}

	// Envia a resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	var taskRequest getTaskRequest

	if err := json.NewDecoder(r.Body).Decode(&taskRequest); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Printf("Failed to decode request body: %v", err)
		return
	}

	// Chama a função de inserção no banco de dados
	doneTasks, doingTasks, todoTasks, err := selectTasks(taskRequest)

	if err != nil {
		http.Error(w, "Failed to insert task", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		return
	}

	// Envia a resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(getTaskResponse{DoneTasks: doneTasks, DoingTasks: doingTasks, TodoTasks: todoTasks}); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
