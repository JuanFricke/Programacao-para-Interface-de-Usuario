package taskApi

type getTaskRequest struct {
	ProjectID int `json:"projectId"`
}

type getTaskResponse struct {
	DoneTasks  []task `json:"doneTasks"`
	DoingTasks []task `json:"doingTasks"`
	TodoTasks  []task `json:"todoTasks"`
}

type task struct {
	ID          string `json:"id"`
	ProjectID   string `json:"projectId"`
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
