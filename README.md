# you can download and run a React + Django project from GitHub step-by-step:

## 🧭 1. Clone the project

Open Terminal (or Command Prompt) and run:


```bash
git clone https://github.com/cherab19/agri-tech-platform.git
```

## 🧭 2. Navigate into the project folder
```bash
cd agri-tech-platform
```
## ⚙️ 3. Setup the Django (Backend) part

Go into the backend folder :
```bash
cd backend
```


Then create a virtual environment:
```bash
python -m venv myenv
```

Activate it:

Windows:
```bash
myenv\Scripts\activate
```

Mac/Linux:
```bash
source venv/bin/activate
```

Install backend dependencies:
```bash
pip install -r requirements.txt
```

Run migrations:
```bash
python manage.py migrate

Start the Django server:

python manage.py runserver
```

## ⚛️ 4. Setup the React (Frontend) part

Open a new terminal tab (keep Django running), then navigate to the frontend folder — for example:
```bash

cd frontend
```

Install frontend dependencies:
```bash
npm install

Run the React app:

npm run dev
```
