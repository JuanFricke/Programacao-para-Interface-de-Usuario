package main

import "fmt"

func selectProjects(UserID int) []Project {
	sql := fmt.Sprintf(`
    SELECT * FROM projects WHERE user_id = %d
    `, UserID)

	return []Project{}
}

func selectTasks(ProjectID int) []Task {
	sql := fmt.Sprintf(`
    SELECT * FROM tasks WHERE project_id = %d
    `, ProjectID)

	return []Task{}
}
