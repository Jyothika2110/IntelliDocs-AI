import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import ChatMessage from "./ChatMessage";
import type { Chat } from "../types/Chat";
import jsPDF from "jspdf";

export default function ChatBox() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const fetchHistory = async () => {

        try {

            const response = await api.get("/history");

            if (Array.isArray(response.data)) {
                setMessages(response.data);
            }

        } catch (error) {

            console.log(error);

        }

    };

    const askQuestion = async () => {

        if (question.trim() === "") return;

        try {

            setLoading(true);

            const response = await api.post("/ask", {
                question
            });

            const newChat: Chat = {
                question,
                answer: response.data
            };

            setMessages(prev => [...prev, newChat]);

            setQuestion("");

        } catch (error) {

            console.log(error);

            alert("Please upload a PDF first.");

        } finally {

            setLoading(false);

        }

    };

    const quickAsk = async (text: string) => {

        try {

            setLoading(true);

            const response = await api.post("/ask", {
                question: text
            });

            const newChat: Chat = {
                question: text,
                answer: response.data
            };

            setMessages(prev => [...prev, newChat]);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const exportPDF = () => {

        const pdf = new jsPDF();

        let y = 20;

        pdf.setFontSize(18);
        pdf.text("IntelliDocs AI Chat", 20, y);

        y += 20;

        messages.forEach(chat => {

            pdf.setFontSize(12);

            pdf.text("You:", 20, y);
            y += 8;

            pdf.text(chat.question, 25, y);
            y += 12;

            pdf.text("AI:", 20, y);
            y += 8;

            const lines = pdf.splitTextToSize(chat.answer, 160);

            pdf.text(lines, 25, y);

            y += lines.length * 8 + 15;

            if (y > 260) {

                pdf.addPage();

                y = 20;

            }

        });

        pdf.save("IntelliDocsChat.pdf");

    };

    const exportTXT = () => {

        let content = "";

        messages.forEach(chat => {

            content += "You:\n";
            content += chat.question + "\n\n";

            content += "AI:\n";
            content += chat.answer + "\n\n";

            content += "---------------------------------------\n\n";

        });

        const blob = new Blob([content], {
            type: "text/plain"
        });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "IntelliDocsChat.txt";

        link.click();

    };

    const deleteChat = async (id: number | undefined) => {

        if (!id) return;

        try {

            await api.delete(`/history/${id}`);

            setMessages(prev =>
                prev.filter(chat => chat.id !== id)
            );

        } catch (error) {

            console.log(error);

            alert("Unable to delete chat.");

        }

    };

    const clearAllChats = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete all chats?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete("/history");

            setMessages([]);

        } catch (error) {

            console.log(error);

            alert("Unable to clear chats.");

        }

    };
    return (

    <div>

        <h2 style={{ marginBottom: "20px" }}>
            Chat with PDF
        </h2>

        {/* Quick Buttons */}

        <div className="chat-input">

            <button onClick={() => quickAsk("What is my CGPA?")}>
                🎓 CGPA
            </button>

            <button onClick={() => quickAsk("What are my skills?")}>
                💻 Skills
            </button>

            <button onClick={() => quickAsk("Show my projects")}>
                📂 Projects
            </button>

            <button onClick={() => quickAsk("Tell me about my internship experience")}>
                🏢 Internship
            </button>

        </div>

        <br />

        {/* Export Buttons */}

        <div
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px",
                flexWrap: "wrap"
            }}
        >

            <button onClick={exportPDF}>
                📄 Export PDF
            </button>

            <button onClick={exportTXT}>
                📝 Export TXT
            </button>

            <button
                style={{
                    background: "#dc3545",
                    color: "white"
                }}
                onClick={clearAllChats}
            >
                🧹 Clear All
            </button>

        </div>

        {/* Search */}

        <input
            type="text"
            placeholder="🔍 Search previous chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px"
            }}
        />

        {/* Chat Window */}

        <div className="chat-window">

            {messages.length === 0 ? (

                <p>No chats yet.</p>

            ) : (

                messages
                    .filter(chat =>
                        chat.question
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||

                        chat.answer
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((chat, index) => (

                        <div key={index}>

                            <ChatMessage
                                sender="🧑 You"
                                message={chat.question}
                            />

                            <ChatMessage
                                sender="🤖 IntelliDocs AI"
                                message={chat.answer}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "8px"
                                }}
                            >

                                <button
                                    style={{
                                        background: "#dc3545",
                                        color: "white"
                                    }}
                                    onClick={() => deleteChat(chat.id)}
                                >
                                    🗑 Delete
                                </button>

                            </div>

                            <hr
                                style={{
                                    margin: "15px 0"
                                }}
                            />

                        </div>

                    ))

            )}

            {loading && (

                <p>
                    🤖 IntelliDocs AI is thinking...
                </p>

            )}

            <div ref={bottomRef}></div>

        </div>
                {/* Input */}

        <div
            style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px"
            }}
        >

            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything about your PDF..."
                style={{
                    flex: 1,
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        askQuestion();
                    }
                }}
            />

            <button
                onClick={askQuestion}
                disabled={loading}
            >
                {loading ? "Thinking..." : "Send"}
            </button>

        </div>

    </div>

);

}