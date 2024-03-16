import AllPDFs from "@/components/others/all-pdfs";
import PDFUpload from "@/components/others/pdf-upload";
import { Profile } from "@/components/others/profile-card";
import { usePdfs } from "@/custom-hooks/usePdfs";
import { useToken } from "@/custom-hooks/useToken";
import { useUser } from "@/custom-hooks/useUser";
import { useState } from "react";

const Dashboard = () => {
  useToken();
  const { profile } = useUser();
  const [_, setReload] = useState(false);
  const { pdfs } = usePdfs(profile?.id!);

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard!</h1>
        </div>
        <div className="p-8">
          <Profile username={profile?.username!} />
        </div>
      </div>

      <PDFUpload id={profile?.id!} setReload={setReload} />
      <div className="flex flex-col w-full mt-2 items-center">
        <AllPDFs pdfs={pdfs || []} ownerId={profile?.id!} />
      </div>
    </div>
  );
};

export default Dashboard;
