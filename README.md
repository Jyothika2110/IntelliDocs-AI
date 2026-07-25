📄 IntelliDocs AI

An AI-powered PDF chatbot that allows users to upload PDF documents and ask questions using the Groq LLM. The application extracts text from uploaded PDFs, processes user queries, and generates intelligent responses while maintaining chat history.

🚀 Features
📄 Upload PDF documents
🤖 Chat with PDF using AI
🔍 Search previous chats
📑 PDF Preview
🌙 Dark / Light Mode
📤 Export Chat as PDF
📝 Export Chat as TXT
🗑 Delete Individual Chats
🧹 Clear Chat History
🛠 Tech Stack
Frontend
React
TypeScript
Vite
Material UI
Backend
Spring Boot
Java
Spring Security
Apache PDFBox
Database
MySQL
AI
Groq LLM API
🏗 Architecture
                    +----------------------+
                    |      React UI        |
                    |  (Vite + TypeScript) |
                    +----------+-----------+
                               |
                               |
                         REST API Calls
                               |
                               v
                 +----------------------------+
                 |    Spring Boot Backend     |
                 |   DocumentController       |
                 +-------------+--------------+
                               |
          +--------------------+--------------------+
          |                    |                    |
          |                    |                    |
          v                    v                    v
   Apache PDFBox         Groq LLM API         MySQL Database
 (Extract PDF Text)     (Generate Answers)   (Store Chat History)
          |
          |
          v
 Document Memory Service
🔄 Application Flow
User Uploads PDF
        │
        ▼
Frontend sends PDF
        │
        ▼
Spring Boot receives PDF
        │
        ▼
PDFBox extracts text
        │
        ▼
Text stored in Memory
        │
        ▼
User asks question
        │
        ▼
Question + PDF Text
        │
        ▼
Groq LLM
        │
        ▼
AI Response
        │
        ▼
Store Chat in MySQL
        │
        ▼
Display Response
▶️ Demo

(Add your demo video link here after uploading.)

👩‍💻 Author

Jyothika

GitHub
https://github.com/Jyothika2110

LinkedIn
https://www.linkedin.com/in/busipoina-jyothika-761471253
