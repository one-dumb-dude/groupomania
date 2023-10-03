# groupomania

This project used node version 18.15.0 for both front-end and back-end.  
( This project has not been tested using other versions of node )

Please note:  This project uses 2 .env files - 
1. In root of project
2. In root of /server/ for node

You will have to create these 2 .env files yourself.  
These files are not provided in this repo.

## Front End
This project was created using Vue 3.  

Copy and paste the following into your vue .env file (located in root of project):
```vue
VITE_NODE_DEVELOPMENT_SERVER=http://localhost:3001
```
Using terminal, navigate to root of project and run:
```bash
npm run dev
```

## Back End
This project uses node with express and postgreSQL for the backend.
The backend logic and setup exists in /server/ directory
### Notes:
###### SQL file:  
/server/base.sql <- Please execute and run this sql script once your postgres has been setup.

###### .env:
Please create an .env file within the root of /server/ directory and paste the following into your .env.

```
# Node
NODE_PORT=3001
LOCAL_SERVER_URL=http://localhost:3001/public/images

# POSTGRES
PG_HOST=yourPostGresHost   # replace with your IP Address or hostname of your postgres server.
PG_DB=groupomania
PG_USER=yourUser   # replace with username of your Postgres server
PG_PASSWORD=yourPassWord  # replace with password of your Postgres server
PG_PORT=5432  # replace with the port number your Postgres Server is using

JWT_SECRET_KEY=yourKey  # Replace with any random string

# Knex
KNEX_ENVIRONMENT=development

```

## if you need help installing postgres then please use the following:
## Setup PostgreSQL Database Using Docker

**a. Pulling the PostgreSQL Docker Image**
   ```bash
   docker pull postgres
   ```

**b. Running a PostgreSQL Container**
Replace `[YourPostgresPassword]` with the desired password for the `postgres` user.
   ```bash
   docker run --name mypostgres -e POSTGRES_PASSWORD=[YourPostgresPassword] -p 5432:5432 -d postgres
   ```
**c. Connecting to the PostgreSQL Container**
   ```bash
   docker exec -it mypostgres psql -U postgres
   ```
**d. Creating a User and Database**
Replace `[YourUserName]` and `[YourUserPassword]` with desired values and `groupomania` is the DB name as per your .env file.
   ```sql
   CREATE USER [YourUserName] WITH PASSWORD '[YourUserPassword]';
   CREATE DATABASE groupomania;
   GRANT ALL PRIVILEGES ON DATABASE groupomania TO [YourUserName];
   ```
Exit PostgreSQL CLI by typing `\q`.

### 2. Updating `.env` File
Ensure the `.env` file is filled correctly with the PostgreSQL details.

```ini
# POSTGRES
PG_HOST=localhost
PG_DB=groupomania
PG_USER=[YourUserName]
PG_PASSWORD=[YourUserPassword]
PG_PORT=5432
```

### 3. Running the SQL Script
You can run the `base.sql` file to create the schema, tables, and functions in your PostgreSQL database.

**a. Running SQL File using psql**
Replace `[YourUserName]` with your PostgreSQL username.
   ```bash
   psql -U [YourUserName] -d groupomania -a -f path_to/base.sql
   ```
Here, `path_to` is where your `base.sql` file is located.

### 4. Setting up Node.js Application
Make sure to install all dependencies and then run the application.

**a. Installing Dependencies**
Navigate to your project folder and run:
   ```bash
   npm install
   ```
**b. Running the Application**
   ```bash
   npm start
   ```

### 5. Testing the Application
At this point, your Node.js application should be running on port `3001`, and it should be able to connect to the PostgreSQL database. Ensure all routes, functionalities, and database interactions are performing as expected.

### Additional Notes:
- Ensure Docker is running in the background while performing these operations.

Remember to replace placeholder values in `.env` and during database creation as per the requirements and ensure all steps are conducted in the correct directory/path.



