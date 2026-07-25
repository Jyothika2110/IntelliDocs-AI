# 🤖 IntelliDocs AI

An AI-powered PDF Chatbot built using **React, Spring Boot, MySQL, Apache PDFBox, and Groq LLM**.  
IntelliDocs AI allows users to upload PDF documents, ask questions based on the uploaded content, and receive intelligent AI-generated responses. It also stores chat history and provides options to export conversations.

---

## 🚀 Features

- 📄 Upload PDF documents
- 🤖 Ask questions about uploaded PDFs
- 💬 AI-powered chatbot using Groq LLM
- 📑 PDF Preview
- 🔍 Search previous conversations
- 📤 Export chat history as PDF
- 📝 Export chat history as TXT
- 🗑 Delete individual chats
- 🧹 Clear complete chat history
- 🌙 Dark & Light Theme
- 💾 Store chat history in MySQL

---

# 🏗️ Architecture

```text
                    +-------------------------+
                    |     React Frontend      |
                    | (React + TypeScript)    |
                    +-----------+-------------+
                                |
                                | REST API
                                |
                                v
                  +----------------------------+
                  |    Spring Boot Backend     |
                  |    REST Controllers        |
                  +-------------+--------------+
                                |
        +-----------------------+-----------------------+
        |                       |                       |
        |                       |                       |
        v                       v                       v
 Apache PDFBox          Groq LLM API            MySQL Database
Extract PDF Text       Generate Responses      Store Chat History
        |
        |
        v
Document Memory Service
```

---

# 🔄 Project Flow

```text
User Uploads PDF
        │
        ▼
React Frontend
        │
        ▼
Spring Boot Backend
        │
        ▼
Apache PDFBox extracts text
        │
        ▼
Document stored in Memory
        │
        ▼
User asks a question
        │
        ▼
Question + PDF Context
        │
        ▼
Groq LLM API
        │
        ▼
AI generates response
        │
        ▼
Store chat in MySQL
        │
        ▼
Display answer to user
```

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Axios

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Apache PDFBox

### Database

- MySQL

### AI

- Groq LLM API

---

## 📂 Project Structure

```text
IntelliDocs-AI
│
├── Frontend
│   ├── Components
│   ├── Services
│   ├── Types
│   └── App.tsx
│
├── Backend
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   ├── Config
│   └── Util
│
└── README.md
```

---

## 📸 Application Screenshots

> Add screenshots here after uploading them.

Example:

```
screenshots/home.png
screenshots/chat.png
screenshots/export.png
```

---

## ▶️ Demo Video

Demo Video:

(Add your demo video link here after uploading.)

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Jyothika2110/IntelliDocs-AI.git
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Backend

```bash
cd Backend/backend
mvn spring-boot:run
```

---

## 📌 Future Improvements

- Authentication & Login
- Multiple PDF Support
- Chat Streaming
- Voice Input
- OCR Support
- Deploy using Docker
- Cloud Deployment

---

## 👩‍💻 Author

**Jyothika**

🔗 GitHub  
https://github.com/Jyothika2110

🔗 LinkedIn  
https://www.linkedin.com/in/busipoina-jyothika-761471253

---

## ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub if you found it useful.
