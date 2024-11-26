# Start from the official Go image
FROM golang:1.23.3-alpine3.20

# Set the working directory
WORKDIR /usr/app

# Copy go.mod and go.sum files for dependency management
COPY go.mod go.sum ./

# Download dependencies and populate the vendor directory
RUN go mod download
RUN go mod vendor

# Copy the entire project directory
COPY . .

# Set the default Go flags to use the vendor directory
ENV GOFLAGS=-mod=vendor

# Build the Go app
RUN go build -o app .

# Command to run the app
CMD ["./app"]
