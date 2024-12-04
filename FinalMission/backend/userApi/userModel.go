package userApi

type SignupRequest struct {
	Username string `json:"username"`
	// Password string `json:"password"`
	Email    string `json:"email"`
	Password string `json:"senha"`
}

type SignupResponse struct {
	StatusCode int    `json:"statusCode"`
	UserId     int    `json:"userId,omitempty"`
	Error      string `json:"error,omitempty"`
}
type LoginRequest struct {
	Email string `json:"email"`
	// Password string `json:"password"`
	Password string `json:"senha"`
}

type LoginResponse struct {
	// StatusCode int    `json:"statusCode"`
	// UserId     int    `json:"userId,omitempty"`
	// Error      string `json:"error,omitempty"`
	Token  string `json:"token"`
	UserId int    `json:"id_usuario"`
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
