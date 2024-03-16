import { PDF } from "@/types/pdf";
import axios from "axios";
import { useEffect, useState } from "react";

export const usePdfs = (ownerId: string) => {
  const [pdfs, setPdfs] = useState<PDF[] | null>(null);

  useEffect(() => {
    const fetchPdfs = async () => {
      const response = await axios.get(`/api/pdf`);
      setPdfs(response.data.pdfs);
    };

    fetchPdfs();
  }, [ownerId]);

  return {
    pdfs,
  };
};
