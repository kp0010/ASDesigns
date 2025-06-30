# ASDesigns 

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Backend-Express-000000?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)](https://www.docker.com/)
[![Razorpay](https://img.shields.io/badge/Payment-Razorpay-02042B?logo=razorpay)](https://razorpay.com/)
[![Google Drive](https://img.shields.io/badge/Storage-Google%20Drive-34A853?logo=google-drive)](https://drive.google.com/)

## 📌 Overview

**ASDesigns** is an online platform for selling custom jersey designs. After successful payment via Razorpay, the respective jersey design is delivered to the customer through Google Drive.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Express.js (Node.js)
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **Payments:** Razorpay
- **Design Delivery:** Google Drive API

## 🚀 Features

- Secure Razorpay payment gateway integration
- Automatic delivery of digital jersey designs via Google Drive
- Organized product catalog for browsing jersey designs
- Dockerized setup for consistent development and deployment

## 🧱 Project Structure

```
./ASDesigns
├── client
│   ├── Dockerfile
│   ├── public/
│   ├── src
│   │   ├── Assets/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Pages/
│   │   └── Routes/
├──── server
│   ├── Dockerfile
│   ├── index.js
│   ├── public
│   │   └── assets/
│   └── routes/
└── docker-compose.yml
```

## 🐳 Docker Setup

To run the application using Docker Compose:

```bash
docker-compose up --build
```

Ensure your `.env` files for both the frontend and backend are properly configured.

## 🧾 Environment Variables

- Frontend (`client/.env`)
  - `VITE_CLERK_KEY`
  - `VITE_SERVER_URL`

- Backend (`server/.env`)
  - `SERVER_PORT`
  - `CLIENT_URL`
  
  - `CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  
  - `GOOGLE_DRIVE_KEY_FILE`
  - `GOOGLE_DRIVE_PARENT_FOLDER_ID`
  - `GOOGLE_DRIVE_USER_GMAIL`
  
  - `MULTER_DESTINATION`
  
  - `PG_USER`
  - `PG_HOST` 
  - `PG_PASSWORD`
  - `PG_DB`
  - `PG_PORT`
  
  - `RAZORPAY_ID_KEY` 
  - `RAZORPAY_SECRET_KEY` 


## 📦 Deployment

You can deploy this project using services like:
- **Render** / **Railway** for backend and PostgreSQL
- **Vercel** / **Netlify** for frontend
- **Docker** for full-stack deployment

## 🤝 License

This project is licensed for personal and commercial use. Attribution appreciated.

---

Developed by Blitzkrieg Team
