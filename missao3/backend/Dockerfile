# Base image with Python 3.12
FROM python:3.12-slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose port 5000 for Flask API
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
