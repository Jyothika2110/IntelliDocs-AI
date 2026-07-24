interface Props {
    fileName: string;
}

export default function PdfViewer({ fileName }: Props) {

    if (!fileName) {

        return (
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Upload a PDF
            </div>
        );

    }

    return (

        <iframe
            title="PDF Viewer"
            src={`http://localhost:8080/api/documents/pdf/${fileName}`}
            width="100%"
            height="100%"
            style={{
                border: "none",
                borderRadius: "10px"
            }}
        />

    );

}