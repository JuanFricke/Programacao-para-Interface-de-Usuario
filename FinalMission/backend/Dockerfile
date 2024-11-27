# Start from the official Go image
FROM golang:1.23.3-alpine3.20

# Set the working directory
WORKDIR /usr/app

# Copy go.mod and go.sum files for dependency management
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project directory
COPY . .

# Build the Go app
RUN go build -o app .

# Command to run the app
CMD ["./app"]