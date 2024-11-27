package projectsApi

type getProjectsRequest struct {
	UserID int `json:"userId"`
}

type getProjectsResponse struct {
	TodoProjects  []Project `json:"todoProjects"`
	DoingProjects []Project `json:"doingProjects"`
	DoneProjects  []Project `json:"doneProjects"`
}

type addProjectResponse struct {
	ProjectId  int    `json:"projectId"`
	StatusCode int    `json:"statusCode"`
	Status     string `json:"status"`
}

type addProjectRequest struct {
	UserID      int    `json:"userId"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Color       string `json:"color"`
}

type Project struct {
	ID          string `json:"id"`
	UserID      string `json:"userId"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Color       string `json:"color"`
}
