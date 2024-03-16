import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { uploadPDF } from "@/utilities/upload";

interface PDFUploadProps {
  id: string;
  setReload: (load: boolean) => void;
}

const PDFUpload = ({ id, setReload }: PDFUploadProps) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file!);
    formData.append("ownerId", id);

    if (!file) {
      toast.error("No file selected");
      return;
    }
    try {
      const url = await uploadPDF(file);
      formData.append("url", url);

      const response = await axios.post("/api/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === 200) {
        toast.success("PDF Uploaded Successfully");
      } else {
        toast.error("Some problem with PDF uploading");
      }
    } catch (error: any) {
      console.log("Some error uploading ", error.message);
      toast.error("Some error occured");
    } finally {
      setLoading(false);
      setFile(null);
      setTitle("");
      setReload(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Input
        type="text"
        placeholder="Enter title here"
        className="w-fit mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full max-w-[40vw] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-3">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">
              {file ? file?.name : "Upload PDF Here"}
            </span>
          </p>
        </div>
        <Input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
      </label>
      <div className="mt-4">
        {loading ? (
          <Button disabled>
            <Loader className="animate-spin" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default PDFUpload;
