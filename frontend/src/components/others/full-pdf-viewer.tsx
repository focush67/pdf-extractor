import { useParams, Link, useLocation } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const FullPDFView = () => {
  const params = useParams();
  const loc = useLocation();
  const location = import.meta.env.VITE_REACT_APP_BACKEND_URL!;
  const pdfFileLocation = `${location}/files/${params.pdfId}`;
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="bg-gray-100">
      <div className="absolute top-0 right-0 p-4 ">
        <Link
          to="/dashboard"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex flex-col items-center mt-20 w-fit bg-gray-300 p-2 ml-auto mr-auto">
        <h1 className="text-xl font-bold mb-4">{loc.state}</h1>
        <Document file={pdfFileLocation} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <div key={page} className="mt-2 mb-2 relative">
                  <Page
                    key={page}
                    pageNumber={page}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    scale={0.58}
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                    Page {page} of {numPages}
                  </div>
                </div>
              );
            })}
        </Document>
      </div>
    </div>
  );
};

export default FullPDFView;
