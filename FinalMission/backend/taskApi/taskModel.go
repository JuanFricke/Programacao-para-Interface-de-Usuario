package taskApi

type getTaskRequest struct {
	ID     int  `json:"projectId"`
	IsUser bool `json:"user"`
}

type getTaskResponse struct {
	TaskColumns []TaskColumn `json:"tasks"`
}

type TaskColumn struct {
	ID int `json:"id"`
	// ColumnName string `json:"columnName"`
	// Tasks      []task `json:"tasks"`
	ColumnName string `json:"nome_coluna"`
	Tasks      []task `json:"atividades"`
}

type task struct {
	// ID          string `json:"id"`
	// ProjectID   string `json:"projectId"`
	// ProjectName string `json:"projectName"`
	// Title       string `json:"title"`
	// Description string `json:"description"`
	// Status      string `json:"status"`
	// Color       string `json:"color"`
	ID          string `json:"id"`
	Title       string `json:"titulo_atividade"`
	ProjectName string `json:"nome_projeto"`
	Color       string `json:"cor_projeto"`
}

type createTaskRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	ProjectID   int    `json:"project_id"`
	Color       string `json:"color"`
}

type createTaskResponse struct {
	// StatusCode int    `json:"statusCode"`
	// TaskId     int    `json:"taskId,omitempty"`
	// Error      string `json:"error,omitempty"`
	ID          int    `json:"id"`
	Title       string `json:"titulo_atividade"`
	ProjectName string `json:"nome_projeto"`
	Color       string `json:"cor_projeto"`
}
