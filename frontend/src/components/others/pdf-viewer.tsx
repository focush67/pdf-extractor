import { Document, Page } from "react-pdf";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Separator } from "../ui/separator";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface PDFProps {
  pdfFile: any;
  title: string;
}

export const PDFViewer = ({ pdfFile, title }: PDFProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="bg-gray-300 p-5 mt-2 mb-2">
      <h1>{title}</h1>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((_, i) => i + 1)
          .map((page) => {
            return (
              <div className="mt-2 mb-2">
                <Page
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            );
          })}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Separator />
    </div>
  );
};
