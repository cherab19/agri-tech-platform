# Agri-Tech Platform 🌾

A fullstack agricultural technology platform connecting farmers, vendors, and drivers for seamless agricultural trade and logistics.

## 🚀 Quick Links

- **[AI-Powered Rapid Development Guide](./AI_RAPID_DEVELOPMENT_GUIDE.md)** - Learn the mysterious ways to build fullstack apps 10x faster with AI Copilot
- **[GitHub Copilot Cheat Sheet](./COPILOT_CHEATSHEET.md)** - Quick reference for AI-assisted coding patterns
- **[System Logic Flow](./Readlogicflow.md)** - Complete user flow documentation
- **[Branch Strategy](./branch_strategy.md)** - Git workflow for the team

---

## 📦 How to download and run this React + Django project:

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

---

## 🎯 Tech Stack

**Backend:**
- Django 4.x
- Django REST Framework
- PostgreSQL
- JWT Authentication

**Frontend:**
- React 18
- Vite
- React Router
- Bootstrap 5
- Axios

**Integrations:**
- Payment: Chapa, Telebirr
- Maps & Tracking: Google Maps / OpenStreetMap
- Real-time: WebSockets (planned)

---

## 📚 Documentation

- **[AI Rapid Development Guide](./AI_RAPID_DEVELOPMENT_GUIDE.md)** - Master fullstack development with AI assistance
- **[Copilot Cheat Sheet](./COPILOT_CHEATSHEET.md)** - Quick patterns and shortcuts for AI coding
- **[System Logic Flow](./Readlogicflow.md)** - Detailed user flows and business logic
- **[Branch Strategy](./branch_strategy.md)** - Git workflow and collaboration guide

---

## 👥 Project Structure

```
agri-tech-platform/
├── backend/              # Django REST API
│   ├── apps/            # Modular Django apps
│   ├── backend/         # Core settings
│   ├── media/           # User uploads
│   └── requirements/    # Python dependencies
│
├── frontend/            # React application
│   ├── src/            # Source code
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API integration
│   │   └── utils/      # Utilities
│   └── public/         # Static assets
│
└── docs/               # Additional documentation
```

---

## 🌟 Features

- 🛒 **Marketplace**: Browse and order agricultural products
- 👨‍🌾 **Farmer Management**: Product listing and inventory
- 🚚 **Logistics**: Real-time delivery tracking
- 💳 **Payments**: Secure escrow-based transactions
- ⭐ **Ratings**: Review system for farmers and drivers
- 📊 **Analytics**: Dashboard for monitoring operations

---

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

See [branch_strategy.md](./branch_strategy.md) for detailed workflow.

---

## 📝 License

This project is part of an academic/development initiative.

---

**Built with ❤️ using modern web technologies and AI-assisted development**
