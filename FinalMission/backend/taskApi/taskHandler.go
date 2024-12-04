package taskApi

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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

func GetTasksByProject(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	taskRequest := getTaskRequest{
		ID:     id,
		IsUser: false,
	}

	log.Println("Getting Tasks...")

	// Chama a função de inserção no banco de dados
	doneTasks, doingTasks, todoTasks, err := selectTasks(taskRequest)

	if err != nil {
		http.Error(w, "Failed to insert task", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		return
	}

	tasks := getTaskResponse{
		TaskColumns: []TaskColumn{{ID: 1, ColumnName: "Done", Tasks: doneTasks}, {ID: 2, ColumnName: "Doing", Tasks: doingTasks}, {ID: 3, ColumnName: "To do", Tasks: todoTasks}},
	}

	// Envia a resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(tasks); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func GetTasksByUser(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	taskRequest := getTaskRequest{
		ID:     id,
		IsUser: true,
	}

	log.Println("Getting Tasks...")

	// Chama a função de inserção no banco de dados
	doneTasks, doingTasks, todoTasks, err := selectTasks(taskRequest)

	if err != nil {
		http.Error(w, "Failed to insert task", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		return
	}

	tasks := getTaskResponse{
		TaskColumns: []TaskColumn{{ID: 1, ColumnName: "Done", Tasks: doneTasks}, {ID: 2, ColumnName: "Doing", Tasks: doingTasks}, {ID: 3, ColumnName: "Todo", Tasks: todoTasks}},
	}

	// Envia a resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(tasks); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
