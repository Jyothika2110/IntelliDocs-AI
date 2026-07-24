import "./App.css";

import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";
import PdfViewer from "./components/PdfViewer";

import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useState } from "react";
import { useTheme } from "./context/ThemeContext";

function App() {

  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const { darkMode, toggleTheme } = useTheme();

  return (

    <div className={darkMode ? "container dark" : "container"}>

      {/* Sidebar */}

      <div className="sidebar">

        <div className="sidebar-header">

          <h1>📄 IntelliDocs AI</h1>

          <IconButton onClick={toggleTheme}>

            {darkMode ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}

          </IconButton>

        </div>

        <UploadBox
          onUploadSuccess={(uploadedFile: string) => {

            setUploaded(true);
            setFileName(uploadedFile);

          }}
        />

        {uploaded ? (

          <div className="uploaded-file">

            <h3>Uploaded Document</h3>

            <p>📄 {fileName}</p>

          </div>

        ) : (

          <p className="upload-text">
            Upload a PDF to begin chatting.
          </p>

        )}

      </div>

      {/* Main */}

      <div className="main">

        <div className="workspace">

          <div className="pdf-panel">

            <PdfViewer
              fileName={fileName}
            />

          </div>

          <div className="chat-panel">

            <ChatBox />

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;