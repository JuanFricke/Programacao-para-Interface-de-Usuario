package dbConnection

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDb() {
	loadEnv()

	// Obtém as variáveis de ambiente carregadas do .env
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPort := os.Getenv("POSTGRES_PORT")
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbSslMode := os.Getenv("POSTGRES_SSLMODE")

	// Monta a string de conexão
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", dbHost, dbPort, dbUser, dbPassword, dbName, dbSslMode)

	var err error
	db, err = sql.Open("postgres", connStr)

	if err != nil {
		log.Fatalf("Tried to Connect to the database, but failed: %v", err)
	}
	// Test the connection
	if err = db.Ping(); err != nil {
		log.Fatalf("Tried Ping the database, but failed: %v", err)
	}
	log.Println("Connected to the database!")
}

func Db() *sql.DB {
	return db
}

func CloseDb() {
	log.Println("Closing database connection")
	db.Close()
}

func loadEnv() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatalf("Error loading .env file")
	// }
}
