import ReactMarkdown from "react-markdown";
import { useTheme } from "../context/ThemeContext";

interface Props {
    sender: string;
    message: string;
}

export default function ChatMessage({
    sender,
    message
}: Props) {

    const isUser = sender === "You";

    const { darkMode } = useTheme();

    return (

        <div
            style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: "18px"
            }}
        >

            <div
                style={{
                    background: isUser
                        ? "#2563eb"
                        : darkMode
                        ? "#374151"
                        : "#f1f5f9",

                    color: isUser
                        ? "#ffffff"
                        : darkMode
                        ? "#ffffff"
                        : "#111827",

                    padding: "14px",
                    borderRadius: "18px",
                    maxWidth: "75%",
                    boxShadow: "0 3px 10px rgba(0,0,0,.08)"
                }}
            >

                <div
                    style={{
                        fontWeight: "bold",
                        marginBottom: "8px"
                    }}
                >
                    {isUser ? "🧑 You" : "🤖 IntelliDocs AI"}
                </div>

                <div
                    style={{
                        lineHeight: 1.7,
                        color: isUser
                            ? "#ffffff"
                            : darkMode
                            ? "#ffffff"
                            : "#111827"
                    }}
                >
                    <ReactMarkdown>
                        {message}
                    </ReactMarkdown>
                </div>

            </div>

        </div>

    );

}