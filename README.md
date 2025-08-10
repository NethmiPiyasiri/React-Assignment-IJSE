# React-Assignment-IJSE

# React Assignment – Full Stack Setup

##  Quick Start

1. **Clone & install backend**
   ```bash
   git clone 'https://github.com/NethmiPiyasiri/React-Assignment-IJSE.git'
   cd backend
   npm install
   ```

2. **Update DB credentials**
   - Open `.env` in `backend` and set:
     ```env
     DB_USER=your_mysql_username
     DB_PASS=your_mysql_password
     ```
   - Create the database in MySQL:
     ```sql
     CREATE DATABASE react-assignment;
     ```

3. **Run backend & setup tables**
   ```bash
   npm start
   ```
   - In browser:
     - Create tables → `http://localhost:8000/tables/create`  
     - Update constraints → `http://localhost:8000/tables/update`

4. **Run frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

##  Project Structure
- **backend/** – Node.js + Express server with MySQL database  
- **frontend/** – React application

---

##  Backend Setup (Detailed)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update database credentials**
   - Open the `.env` file inside `backend` (already committed in repo).  
   - Change only:
     ```env
     DB_USER=your_mysql_username
     DB_PASS=your_mysql_password
     ```

4. **Create the database**
   ```sql
   CREATE DATABASE react-assignment;
   ```

5. **Start the backend**
   ```bash
   npm start
   ```

6. **Create necessary tables**
   - Open your browser and visit:
     ```
     http://localhost:8000/tables/create
     ```

7. **Update foreign key & primary key constraints**
   - Visit:
     ```
     http://localhost:8000/tables/update
     ```

---

##  Frontend Setup (Detailed)

1. **Navigate to the frontend folder**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the frontend**
   ```bash
   npm run dev
   ```

---

##  Access the Application
- Backend: **http://localhost:8000**  
- Frontend: **http://localhost:5173** (or port shown after running `npm run dev`)

---

##  Notes
- Ensure MySQL server is running before starting the backend.
- Only `DB_USER` and `DB_PASS` in `.env` need to be changed.


