package projectsApi

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

func GetProjects(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var projectRequest getProjectsRequest
	if err := json.Unmarshal(body, &projectRequest); err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}

	log.Println("Json Received and parsing Complete")

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	madeProjects, todoProjects, doingProjects := selectProjects(projectRequest)

	response := getProjectsResponse{TodoProjects: todoProjects, DoingProjects: doingProjects, DoneProjects: madeProjects}

	log.Println("Projects Selected!")

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

func AddProject(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var projectRequest addProjectRequest
	if err := json.Unmarshal(body, &projectRequest); err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	response := insertProject(projectRequest)

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}
