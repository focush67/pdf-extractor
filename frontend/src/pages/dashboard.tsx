import PDFUpload from "@/components/others/pdf-upload";
import { PDFViewer } from "@/components/others/pdf-viewer";
import { Profile } from "@/components/others/profile-card";
import { usePdfs } from "@/custom-hooks/usePdfs";
import { useToken } from "@/custom-hooks/useToken";
import { useUser } from "@/custom-hooks/useUser";

const Dashboard = () => {
  useToken();
  const { profile } = useUser();

  const { pdfs } = usePdfs(profile?.id!);
  console.log("This users pdfs ", pdfs);
  const location = import.meta.env.VITE_REACT_APP_BACKEND_URL!;
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="flex">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard!</h1>
        </div>
        <div className="p-8">
          <Profile username={profile?.username!} />
        </div>
      </div>

      <PDFUpload id={profile?.id!} />
      <div className="flex flex-col w-fit items-center justify-center ml-4">
        {pdfs?.map((pdf, i) => (
          <PDFViewer
            pdfFile={`${location}/files/${pdf.fileName}`}
            title={pdf.title}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
