# 📸 Image Vault

## Overview

Image Vault is a full-stack web application that allows users to upload and download images. The application is built using **React.js** for the frontend and **Node.js (Express) with MongoDB (S3)** for the backend. It supports storing images in **MongoDB with AWS S3**.

---

## 🏗️ Tech Stack

### **Frontend**
- React.js (Vite)
- MUI (Material-UI) for UI components
- React Hooks for state management

### **Backend**
- Node.js with Express.js
- MongoDB with AWS S3 for storage
- Mongoose (ODM for MongoDB)
- Multer (for handling image uploads)
- Docker (for MongoDB containerization)
- AWS SDK (for S3 storage)

---

## 🚀 Features

✅ Upload images using a simple web form
✅ View/download images from MongoDB and S3
✅ Store metadata (filename, upload date, file size, etc.)
✅ AWS S3 storage for images
✅ Fully containerized backend with Docker
✅ Responsive UI with Material-UI (MUI)

---

## 🛠️ Setup Instructions

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js** (latest LTS version)
- **Docker** (if using MongoDB container)
- **AWS account** for S3 configuration (for image storage)

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/image-vault.git
cd image-vault

 Backend_Setup:
 cd server
 cp .env.example .env
 docker compose up --build

 Frontend_Setup:
  npm install
  npm run dev


