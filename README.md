#**Installation**

Edit the yaml `file docker-compose.yml`
Search and replace `changeYourDBPasswordOverHere` to change db password and `changeYourKeyOverHere` to change the app key to something like this `Lo3ywq8pQTZbqCitg3stnJFAqwKy084N`.
```yaml
version: '3'
services:
  postgres:
    image: 'postgres:latest'
    restart: always
    environment:
      - POSTGRES_PASSWORD=changeYourDBPasswordOverHere
  api:
    build:
      dockerfile: Dockerfile
      context: ./server
    restart: always
    depends_on:
      - postgres
    ports:
      - "80:3000"
    volumes:
      - ./server:/app
      - /app/node_modules
    environment:
      - APP_KEY=changeYourKeyOverHere
      - SESSION_EXPIRES_IN=24h # SESSION WILL EXPIRE IN 24 hours
      - PGUSER=postgres
      - PGHOST=postgres
      - PGDATABASE=postgres
      - PGPASSWORD=changeYourDBPasswordOverHere
      - PGPORT=5432
```


**Build and Run Server with Docker**

```bash
cd ic-code-testing-app/

docker-compose build
 
docker-compose up -d

```

api will be accessible through http://localhost:80 


**Build and Run Phone App**

Create the environment file.
```bash
cd ic-code-testing-app/phone

cp template.env .env
```
**Note:** make sure the file `.env` existed in the phone folder. if not use your ide to copy paste or create new file by any editor you like. 

```bash
cd ic-code-testing-app/phone

npm install
 
react-native run-ios
```

Once you are in the iphone emulator go to: `Settings > Developer` and at the very bottom toggle `Allow Http Services` to be on.



**Note:** make sure you have docker, npm, react-native, watchman, and xcode installed 


