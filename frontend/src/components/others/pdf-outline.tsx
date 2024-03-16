import { Document, Page } from "react-pdf";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface PDFProps {
  fileLocation: string;
  title: string;
  ownerId: string;
}

export const PDFViewerComponent = ({
  title,
  fileLocation,
  ownerId,
}: PDFProps) => {
  const [pageNumber] = useState<number>(1);
  const location = import.meta.env.VITE_REACT_APP_BACKEND_URL!;
  return (
    <div className="bg-gray-300 p-5 mt-2 mb-2 w-fit">
      <h1>{title}</h1>

      <Document
        file={`${location}/files/${fileLocation}`}
        className={"w-fit h-fit"}
      >
        <div className="mt-2 mb-2 p-2">
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={0.4}
          />
        </div>
      </Document>
      <div className="flex justify-evenly mt-2">
        <Link to={`/pdf/${fileLocation}`} state={title}>
          Open
        </Link>
        <Link to={`/pdf/edit/${fileLocation}`} state={ownerId}>
          Edit
        </Link>
      </div>
      <Separator />
    </div>
  );
};
