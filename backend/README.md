# Coding Platform Project Architecture

## Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* PostgreSQL
* JWT Authentication

### Frontend

* React
* Vite
* Tailwind CSS
* Monaco Editor

### Code Execution

* Docker Containers

---

# Backend Structure

```text
backend/
│
├── manage.py
├── requirements.txt
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── accounts/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── permissions.py
│
├── problems/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── services.py
│
├── submissions/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── services.py
│
├── execution/
│   ├── docker_runner.py
│   ├── python_executor.py
│   ├── javascript_executor.py
│   └── java_executor.py
│
├── progress/
│   ├── views.py
│   ├── serializers.py
│   └── services.py
│
└── leaderboard/
    ├── views.py
    └── serializers.py
```

---

# Frontend Structure

```text
frontend/
│
├── src/
│
├── api/
│   ├── axios.js
│   ├── authApi.js
│   ├── problemApi.js
│   ├── submissionApi.js
│   └── progressApi.js
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Problems.jsx
│   ├── ProblemDetails.jsx
│   ├── SubmissionHistory.jsx
│   └── Leaderboard.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── ProblemCard.jsx
│   ├── CodeEditor.jsx
│   ├── TestCasePanel.jsx
│   ├── ResultPanel.jsx
│   ├── ProgressCard.jsx
│   └── Loader.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useSubmission.js
│
├── layouts/
│   └── MainLayout.jsx
│
└── routes/
    └── AppRoutes.jsx
```

---

# Database Design

## User Table

```text
id
username
email
password
joined_at
```

---

## Problems Table

```text
id
title
slug
description
difficulty
starter_code_python
starter_code_javascript
starter_code_java
created_at
```

---

## TestCases Table

```text
id
problem_id
input_data
expected_output
is_hidden
```

Example:

Input:

```text
[1,2,3,4]
```

Expected Output:

```text
10
```

---

## Submission Table

```text
id
user_id
problem_id
language
code
status
execution_time
memory_usage
passed_count
total_count
submitted_at
```

---

## Solved Problems Table

```text
id
user_id
problem_id
solved_at
```

This table helps generate dashboards quickly.

---

# API Design

## Authentication

```text
POST /api/register/
POST /api/login/
POST /api/logout/
GET  /api/profile/
```

---

## Problems

```text
GET /api/problems/
GET /api/problems/{id}/
```

---

## Submission

```text
POST /api/submissions/
GET  /api/submissions/
```

---

## Dashboard

```text
GET /api/progress/
GET /api/leaderboard/
```

---

# Execution Flow

```text
User writes code
        ↓
React sends code to DRF
        ↓
DRF creates submission
        ↓
Execution service creates temporary file
        ↓
Docker executes file
        ↓
Output collected
        ↓
Compared with expected output
        ↓
Submission saved
        ↓
Frontend displays result
```

---

# Development Roadmap

## Week 1

* Authentication
* Problem CRUD
* TestCase CRUD

## Week 2

* React setup
* Problem list page
* Problem details page

## Week 3

* Monaco Editor integration
* Submission API

## Week 4

* Python execution engine

## Week 5

* JavaScript execution engine

## Week 6

* Java execution engine

## Week 7

* Dashboard
* Solved statistics
* Streaks

## Week 8

* Leaderboard
* Public profiles
* Search and filters

```
```
