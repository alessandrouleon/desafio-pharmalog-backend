FROM node:18

# Diretório de trabalho no container
WORKDIR /usr/src/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta
EXPOSE 4050

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]

