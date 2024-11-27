package userApi

type SignupRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type SignupResponse struct {
	StatusCode int    `json:"statusCode"`
	UserId     int    `json:"userId,omitempty"`
	Error      string `json:"error,omitempty"`
}
type LoginRequest struct {
	EmailOrUsername string `json:"emailOrUsername"`
	Password        string `json:"password"`
}

type LoginResponse struct {
	StatusCode int    `json:"statusCode"`
	UserId     int    `json:"userId,omitempty"`
	Error      string `json:"error,omitempty"`
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
