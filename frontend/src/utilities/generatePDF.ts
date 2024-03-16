import { PDFDocument } from "pdf-lib";
import axios from "axios";

interface CreatePDFProps {
  pdfFileLocation: string;
  selectedPages: number[];
}

export const createPDF = async ({
  pdfFileLocation,
  selectedPages,
}: CreatePDFProps) => {
  try {
    const response = await axios.get(pdfFileLocation, {
      responseType: "arraybuffer",
    });
    const existingPDFBytes = response.data;
    const pdfDoc = await PDFDocument.create();
    const existingPDFDoc = await PDFDocument.load(existingPDFBytes);
    for (const pageIndex of selectedPages) {
      const [copiedPage] = await pdfDoc.copyPages(existingPDFDoc, [
        pageIndex - 1,
      ]);
      pdfDoc.addPage(copiedPage);
    }
    const newPDFBytes = await pdfDoc.save();
    const blob = new Blob([newPDFBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    return url;
  } catch (error: any) {
    console.log("Some error in generating PDF: ", error.message);
    return null;
  }
};
