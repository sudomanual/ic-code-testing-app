FROM node:alpine

WORKDIR "/app"

COPY ./package.json ./

RUN npm install

COPY . .

# TODO change dev to start when you are done
CMD ["npm", "run", "dev"]