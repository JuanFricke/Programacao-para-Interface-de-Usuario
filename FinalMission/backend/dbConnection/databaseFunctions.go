package dbConnection

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
)

var db *sql.DB

func loadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found, using system environment variables")
	}
}

func InitDb() {
	loadEnv()

	// Obtém e valida as variáveis de ambiente
	requiredEnvVars := []string{"POSTGRES_HOST", "POSTGRES_PORT", "POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_DB", "POSTGRES_SSLMODE"}
	for _, envVar := range requiredEnvVars {
		if os.Getenv(envVar) == "" {
			log.Printf("Environment variable %s is missing", envVar)
		}
	}

	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_PORT"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
		os.Getenv("POSTGRES_SSLMODE"),
	)

	var err error

	// Retry logic
	maxRetries := 10
	retryDelay := 5 * time.Second

	for i := 0; i < maxRetries; i++ {
		db, err = sql.Open("postgres", connStr)
		if err != nil {
			log.Printf("Attempt %d: Failed to open DB connection: %v", i+1, err)
			time.Sleep(retryDelay)
			continue
		}

		err = db.Ping()
		if err == nil {
			log.Println("Successfully connected to the database!")
			return
		}

		log.Printf("Attempt %d: Failed to ping database: %v", i+1, err)
		time.Sleep(retryDelay)
	}

	log.Fatalf("Failed to connect to the database after %d attempts: %v", maxRetries, err)
}

func CloseDb() {
	log.Println("Closing database connection")
	db.Close()
}
func Db() *sql.DB {
	if db == nil {
		log.Fatal("Database connection is nil")
	}
	return db
}
