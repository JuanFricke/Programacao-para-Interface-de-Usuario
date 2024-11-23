// model.go
package main

type Book struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Year   int    `json:"year"`
}

// In-memory data store
var books = []Book{
	{ID: "1", Title: "1984", Author: "George Orwell", Year: 1949},
	{ID: "2", Title: "To Kill a Mockingbird", Author: "Harper Lee", Year: 1960},
}

type ProjectRequest struct {
	UserID int `json:"userId"`
}

type TaskRequest struct {
	ProjectID int `json:"projectId"`
}

type Project struct {
	ID          string `json:"id"`
	UserID      string `json:"userId"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Color       string `json:"color"`
}

type Task struct {
	ID          string `json:"id"`
	ProjectID   string `json:"projectId"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Color       string `json:"color"`
}
