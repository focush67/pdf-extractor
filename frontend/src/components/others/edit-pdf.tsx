import { useState, useTransition } from "react";
import { Document, Page } from "react-pdf";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Loader } from "lucide-react";

import { createPDF } from "@/utilities/generatePDF";
import toast from "react-hot-toast";

const EditPDFPages = () => {
  const params = useParams();
  const location = import.meta.env.VITE_REACT_APP_BACKEND_URL!;
  const pdfFileLocation = `${location}/files/${params.pdfId}`;

  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const [numPages, setNumPages] = useState<number>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  const toggleSelection = (page: number) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  const generateNewPDF = () => {
    startTransition(() => {
      createPDF({ pdfFileLocation, selectedPages })
        .then(() => {
          toast.success("PDF Generated");
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Some error occured");
        });
    });
  };

  return (
    <div className="bg-gray-300 h-fit flex flex-col items-center">
      <div className="flex items-center justify-between gap-x-3">
        <h1>Edit PDF Here</h1>
        <Link to={"/dashboard"}>
          <ArrowLeft />
        </Link>
      </div>

      <Document file={pdfFileLocation} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((_, i) => i + 1)
          .map((page) => (
            <div key={page} className="mt-2 mb-2 relative w-fit">
              <Page
                key={page}
                pageNumber={page}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                scale={0.5}
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(page)}
                    onChange={() => toggleSelection(page)}
                  />
                  Page {page} of {numPages}
                </label>
              </div>
            </div>
          ))}
      </Document>
      {isPending ? (
        <Button disabled>
          <Loader className="animate-spin" />
        </Button>
      ) : (
        <Button onClick={generateNewPDF} className="bg-blue-900">
          Generate
        </Button>
      )}
    </div>
  );
};

export default EditPDFPages;
