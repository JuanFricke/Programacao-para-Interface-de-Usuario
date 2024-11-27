package userApi

import (
	"crypto/hmac"
	"crypto/md5"
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
)

func hmacEncrypt(password, secret string) string {
	// Cria um HMAC com MD5
	hash := hmac.New(md5.New, []byte(secret))
	hash.Write([]byte(password))
	// Codifica o HMAC em base64
	return base64.StdEncoding.EncodeToString(hash.Sum(nil))
}

// func SignupUser(w http.ResponseWriter, r *http.Request) {
// 	var request SignupRequest
// 	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
// 		http.Error(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}

// 	if !checkUserExists(request.Email) {
// 		log.Fatal("User already exists")
// 		json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusConflict, Error: "User Already Exists"})
// 		return
// 	}
// 	// Criptografando a senha com HMAC
// 	//encryptedPassword := hmacEncrypt(request.Password, "teste") //Comentado por Vinícius - Vai ser gerado o hash com funcao de banco no INSERT
// 	encryptedPassword := request.Password //Vinicius

// 	request.Password = encryptedPassword
// 	// Chama a função de inserção no banco de dados
// 	userID, err := insertUser(request)

// 	// Verifica erros na inserção
// 	if err != nil {
// 		log.Fatalf("Error inserting user: %v", err)
// 		json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusInternalServerError, Error: "Failed to insert user"})
// 		return
// 	}

// 	// Responde com os dados do novo usuário (sem incluir a senha)
// 	w.WriteHeader(http.StatusCreated)
// 	json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusCreated, UserId: userID})

// }

// func LoginUser(w http.ResponseWriter, r *http.Request) {
// 	var request LoginRequest
// 	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
// 		http.Error(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}

// 	// Criptografando a senha com HMAC
// 	// encryptedPassword := hmacEncrypt(request.Password, "teste")

// 	// Verificando o usuário no banco de dados
// 	// var storedPassword string
// 	// var storedUsername string
// 	// err := db.QueryRow("SELECT username, password FROM users WHERE username = $1", request.Username).Scan(&storedUsername, &storedPassword)
// 	if checkUserExists(request.Email) {
// 		log.Printf("User already exists: %s", request.Email)
// 		json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusConflict, Error: "User Already Exists"})
// 		return
// 	}

// 	user, err := checkUserCredentials(request)

// 	if err != nil {
// 		// http.Error(w, "Invalid credentials", http.StatusUnauthorized)
// 		json.NewEncoder(w).Encode(LoginResponse{StatusCode: http.StatusUnauthorized, Error: "Invalid credentials"})
// 		return
// 	}

// 	// // Verificar se a senha criptografada corresponde
// 	// if user.Password != encryptedPassword {
// 	// 	http.Error(w, "Invalid credentials", http.StatusUnauthorized)
// 	// 	return
// 	// }

// 	// Sucesso no login
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(LoginResponse{StatusCode: http.StatusOK, UserId: user.ID})
// }

func SignupUser(w http.ResponseWriter, r *http.Request) {
	var request SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Verificar se o usuário já existe
	if checkUserExists(request.Email) {
		log.Printf("User already exists: %s", request.Email)
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusConflict, Error: "User already exists"})
		return
	}

	// Inserir o usuário no banco
	userID, err := insertUser(request)
	if err != nil {
		log.Printf("Error inserting user: %v", err)
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(SignupResponse{StatusCode: http.StatusCreated, UserId: userID})
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var request LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Verificar credenciais
	user, err := checkUserCredentials(request)
	if err != nil {
		log.Printf("Invalid login attempt for: %s", request.EmailOrUsername)
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(LoginResponse{StatusCode: http.StatusUnauthorized, Error: "Invalid credentials"})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(LoginResponse{StatusCode: http.StatusOK, UserId: user.ID})
}
