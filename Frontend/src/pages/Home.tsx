import UploadBox from "../components/UploadBox";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

export default function Home() {

    const [uploaded, setUploaded] = useState(false);

    return (

        <div className="container">

            <div className="sidebar">

                <h1>📄 IntelliDocs AI</h1>

                <UploadBox
                    onUploadSuccess={() => setUploaded(true)}
                />

                <hr />

                <h3>Recent Chats</h3>

                <p>What is my CGPA?</p>
                <p>Skills</p>
                <p>Projects</p>

            </div>

            <div className="main">

                <ChatBox />

            </div>

        </div>

    );

}