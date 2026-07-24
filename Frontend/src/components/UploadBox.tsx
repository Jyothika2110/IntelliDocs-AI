import { useState } from "react";
import api from "../services/api";

interface Props {
  onUploadSuccess: (fileName: string) => void;
}

export default function UploadBox({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadPdf = async () => {
    if (!file) {
      alert("Please choose a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Pass uploaded filename to App.tsx
      onUploadSuccess(response.data.fileName);

      alert("PDF Uploaded Successfully");

    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-box">

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button
        onClick={uploadPdf}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

    </div>
  );
}