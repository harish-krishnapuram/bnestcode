# BenstCode - Online Coding Practice Platform

BenstCode is a coding practice platform inspired by LeetCode, built using Django REST Framework and React.

Users can solve programming problems in multiple languages, submit solutions, track their progress, and improve their problem-solving skills through a clean and interactive interface.

---

## Features

### User Features

* User registration and authentication
* Browse coding problems
* Filter problems by difficulty
* Solve problems using:

  * Python
  * JavaScript
  * Java
* Run code against sample test cases
* Submit solutions for evaluation
* View submission history
* Track solved problems and progress
* Monitor acceptance rate and statistics

### Admin Features

* Create and manage coding problems
* Add sample test cases
* Add hidden test cases
* Manage problem difficulty levels
* View user submissions and statistics

---

## Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* JWT Authentication
* PostgreSQL

### Frontend

* React
* Vite
* Tailwind CSS
* Monaco Editor

### Code Execution

* Docker Containers

---

## Project Structure

```text
backend/
├── accounts/
├── problems/
├── submissions/
├── config/
└── manage.py

frontend/
├── src/
├── public/
├── package.json
└── vite.config.js
```

---

## Database Models

### Accounts

* User

### Problems

* Problem
* TestCase

### Submissions

* Submission

---

## Supported Languages

* Python
* JavaScript
* Java

---

## Problem Workflow

1. User selects a problem.
2. User writes a solution in the preferred language.
3. The solution is submitted to the backend.
4. The code executes inside an isolated Docker container.
5. Output is compared with predefined test cases.
6. Results are stored and displayed to the user.

---

## Security Features

* JWT Authentication
* Docker-based code execution isolation
* Hidden test cases
* Request validation
* Rate limiting
* Copy and paste restrictions in editor

---

## Future Enhancements

* Leaderboard
* Daily challenges
* Contest mode
* Discussion section
* Company-wise interview questions
* User profiles
* Achievement badges
* Streak tracking
* AI-based hints and explanations

---

## Getting Started

### Backend Setup

```bash
git clone <repository-url>
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

---

## Motivation

The goal of this project is to provide an affordable and lightweight coding practice platform where developers can improve their problem-solving skills and track their learning journey.

---

## Author

Developed by Harish Krishnapuram using Django REST Framework and React.
