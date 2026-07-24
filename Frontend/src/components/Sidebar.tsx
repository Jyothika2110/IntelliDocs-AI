import UploadBox from "./UploadBox";

interface Props {
    onUploadSuccess: (fileName: string) => void;
}

export default function Sidebar({ onUploadSuccess }: Props) {

    return (

        <div className="sidebar">

            <h1>📄 IntelliDocs AI</h1>

            <UploadBox
                onUploadSuccess={onUploadSuccess}
            />

            <div className="menu">

                <h3>Recent Chats</h3>

                <div className="menu-item">
                    What is my CGPA?
                </div>

                <div className="menu-item">
                    Skills
                </div>

                <div className="menu-item">
                    Projects
                </div>

            </div>

        </div>

    );

}