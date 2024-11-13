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
