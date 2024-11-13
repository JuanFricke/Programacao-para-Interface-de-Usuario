# Como fazer o setup docker no windows usando WSL

> power shell como administrador
```pwsh
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
winget install --id Canonical.Ubuntu
```

> dentro do Ubuntu

```bash

# Atualizar o sistema e instalar dependências
sudo apt update
sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Adicionar a chave GPG do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar o repositório do Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar os pacotes e instalar o Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Iniciar o Docker manualmente
sudo service docker start

# Verificar a instalação
sudo docker --version
sudo docker run hello-world

# (Opcional) Executar Docker sem usar sudo
sudo usermod -aG docker $USER


```

# rodar o docker

```bash

docker compose up
```