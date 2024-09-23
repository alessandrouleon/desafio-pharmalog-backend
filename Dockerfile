FROM node:18

WORKDIR /usr/src/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4050

CMD ["npm", "run", "start:dev"]
