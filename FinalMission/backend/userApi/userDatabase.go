package userApi

import (
	"backend/dbConnection"
	"log"
)

func insertUser(userRequest SignupRequest) (int, error) {
	db := dbConnection.Db()
	/*sqlQuery := `
		INSERT INTO users (username, password, email)
		VALUES ($1, $2, $3)
		RETURNING id
	`*/
	sqlQuery := `
		INSERT INTO users (username, password, email) 
		VALUES ($1, (select encode(hmac($2, '', 'md5'), 'base64')), $3)
		RETURNING id
	`

	var userID int
	err := db.QueryRow(sqlQuery, userRequest.Username, userRequest.Password, userRequest.Email).Scan(&userID)
	if err != nil {
		log.Fatalf("Error executing query: %s, Error: %v", sqlQuery, err)
		return 0, err
	}

	log.Printf("Successfully inserted user: %v with ID %d", userRequest.Username, userID)
	return userID, nil
}

func checkUserExists(email string) bool {
	db := dbConnection.Db()
	var count int
	sqlQuery := `
		SELECT COUNT(*)
		FROM users
		WHERE email = $1
	`
	err := db.QueryRow(sqlQuery, email).Scan(&count)
	if err != nil {
		log.Fatalf("Error executing query: %s, Error: %v", sqlQuery, err)
		return false
	}

	if count > 0 {
		return true
	} else {
		return false
	}
}

func checkUserCredentials(userRequest LoginRequest) (User, error) {
	db := dbConnection.Db()

	var user User
	sqlQuery := `
		SELECT id, username, email
		FROM users
		WHERE email = $1 AND password = (select encode(hmac($2, '', 'md5'), 'base64'))
	`
	err := db.QueryRow(sqlQuery, userRequest.Email, userRequest.Password).Scan(&user.ID, &user.Username, &user.Email)
	if err != nil {
		log.Printf("Error executing query: %s, Error: %v", sqlQuery, err)
		return User{}, err
	}
	return user, nil
}
