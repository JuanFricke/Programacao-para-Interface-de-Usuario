package main

import (
	"crypto/hmac"
	"crypto/md5"
	"encoding/base64"
	"encoding/json"
	"net/http"
)

func hmacEncrypt(password, secret string) string {
	// Cria um HMAC com MD5
	hash := hmac.New(md5.New, []byte(secret))
	hash.Write([]byte(password))
	// Codifica o HMAC em base64
	return base64.StdEncoding.EncodeToString(hash.Sum(nil))
}

func createUser(w http.ResponseWriter, r *http.Request) {
	var request CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Criptografando a senha com HMAC
	encryptedPassword := hmacEncrypt(request.Password, "teste")

	// Chama a função de inserção no banco de dados
	userID, err := insertUser(CreateUserRequest{
		Username: request.Username,
		Password: encryptedPassword,
		Email:    request.Email,
	})

	// Verifica erros na inserção
	if err != nil {
		http.Error(w, "Failed to insert user", http.StatusInternalServerError)
		return
	}

	// Responde com os dados do novo usuário (sem incluir a senha)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(User{
		ID:       userID, // Retorna o ID gerado
		Username: request.Username,
		Email:    request.Email,
	})
}

func loginUser(w http.ResponseWriter, r *http.Request) {
	var request CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Criptografando a senha com HMAC
	encryptedPassword := hmacEncrypt(request.Password, "teste")

	// Verificando o usuário no banco de dados
	var storedPassword string
	var storedUsername string
	err := db.QueryRow("SELECT username, password FROM users WHERE username = $1", request.Username).Scan(&storedUsername, &storedPassword)
	if err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	// Verificar se a senha criptografada corresponde
	if encryptedPassword != storedPassword {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Sucesso no login
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Login successful"})
}
