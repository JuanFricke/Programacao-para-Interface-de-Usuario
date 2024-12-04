package taskApi

type getTaskRequest struct {
	ID     int  `json:"projectId"`
	IsUser bool `json:"user"`
}

type getTaskResponse struct {
	TaskColumns []TaskColumn `json:"tasks"`
}

type TaskColumn struct {
	ID         int    `json:"id"`
	ColumnName string `json:"columnName"`
	Tasks      []task `json:"tasks"`
}

type task struct {
	ID          string `json:"id"`
	ProjectID   string `json:"projectId"`
	ProjectName string `json:"projectName"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Color       string `json:"color"`
}

type createTaskRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	ProjectID   int    `json:"project_id"`
	Color       string `json:"color"`
}

type createTaskResponse struct {
	StatusCode int    `json:"statusCode"`
	TaskId     int    `json:"taskId,omitempty"`
	Error      string `json:"error,omitempty"`
}
