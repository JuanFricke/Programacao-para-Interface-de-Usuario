# Start from the official Go image
FROM golang:1.23.3-alpine3.20

# Set the working directory in the container
WORKDIR /app

# Copy go.mod and go.sum files for dependency management
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project into the working directory
COPY . .

# Expose the application port
EXPOSE 8000

# Run the executable
CMD ["go run ."]
