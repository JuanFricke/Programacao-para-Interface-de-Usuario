# backend/Dockerfile
FROM python:3.12

WORKDIR /usr/app/

# Instalar dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código do app
COPY . .

# Expor a porta onde o Flask estará rodando
EXPOSE 5000

# Comando para rodar o servidor Flask
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
