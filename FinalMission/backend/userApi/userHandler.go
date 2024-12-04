package userApi

import (
	"crypto/hmac"
	"crypto/md5"
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
)

func hmacEncrypt(password, secret string) string {
	// Cria um HMAC com MD5
	hash := hmac.New(md5.New, []byte(secret))
	hash.Write([]byte(password))
	// Codifica o HMAC em base64
	return base64.StdEncoding.EncodeToString(hash.Sum(nil))
}

func SignupUser(w http.ResponseWriter, r *http.Request) {
	var request SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if checkUserExists(request.Email) {
		log.Print("User already exists")
		json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusConflict, Error: "User Already Exists"})
		return
	}
	// Criptografando a senha com HMAC
	//encryptedPassword := hmacEncrypt(request.Password, "teste") //Comentado por Vinícius - Vai ser gerado o hash com funcao de banco no INSERT
	encryptedPassword := request.Password //Vinicius

	request.Password = encryptedPassword
	// Chama a função de inserção no banco de dados
	userID, err := insertUser(request)

	// Verifica erros na inserção
	if err != nil {
		log.Printf("Error inserting user: %v", err)
		json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusInternalServerError, Error: "Failed to insert user"})
		return
	}

	// Responde com os dados do novo usuário (sem incluir a senha)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusCreated, UserId: userID})

}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var request LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Criptografando a senha com HMAC
	// encryptedPassword := hmacEncrypt(request.Password, "teste")

	// Verificando o usuário no banco de dados
	// var storedPassword string
	// var storedUsername string
	// err := db.QueryRow("SELECT username, password FROM users WHERE username = $1", request.Username).Scan(&storedUsername, &storedPassword)
	if !checkUserExists(request.Email) {
		log.Print("User does not exist")
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	user, err := checkUserCredentials(request)

	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		// json.NewEncoder(w).Encode(LoginResponse{StatusCode: http.StatusUnauthorized, Error: "Invalid credentials"})
		return
	}

	token := generateToken()

	// Sucesso no login
	w.WriteHeader(http.StatusOK)
	// json.NewEncoder(w).Encode(LoginResponse{StatusCode: http.StatusOK, UserId: user.ID})
	json.NewEncoder(w).Encode(LoginResponse{UserId: user.ID, Token: token})
}

func generateToken() string {
	return uuid.New().String()
}
