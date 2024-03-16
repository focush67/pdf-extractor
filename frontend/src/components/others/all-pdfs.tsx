import { PDF } from "@/types/pdf";
import { PDFViewerComponent } from "./pdf-outline";

interface AllPDFsProps {
  pdfs: PDF[] | [];
  ownerId: string;
}

const AllPDFs = ({ pdfs, ownerId }: AllPDFsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {pdfs && pdfs.length > 0 ? (
        pdfs.map((pdf: PDF, i) => (
          <PDFViewerComponent
            key={i}
            fileLocation={pdf.fileName}
            title={pdf.title}
            ownerId={ownerId}
          />
        ))
      ) : (
        <h1 className="mt-4 text-2xl font-semibold">No PDFs Saved Yet</h1>
      )}
    </div>
  );
};

export default AllPDFs;
