package projectsApi

type getProjectsRequest struct {
	UserID int `json:"userId"`
}

type getProjectsResponse struct {
	// TodoProjects  []Project `json:"todoProjects"`
	// DoingProjects []Project `json:"doingProjects"`
	// DoneProjects  []Project `json:"doneProjects"`
	Projects []Project `json:"projects"`
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
	// ID          string `json:"id"`
	// UserID      string `json:"userId"`
	// Title       string `json:"title"`
	// Description string `json:"description"`
	// Status      string `json:"status"`
	// Color       string `json:"color"`
	ID          int    `json:"id"`
	Title       string `json:"titulo_projeto"`
	Description string `json:"desc_projeto"`
	Percentage  string `json:"porcentagem_atividade"`
	Color       string `json:"cor_projeto"`
}
