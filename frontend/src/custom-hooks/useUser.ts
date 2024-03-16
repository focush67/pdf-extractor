import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
export const useUser = () => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/login");
        setProfile(response.data.user);
      } catch (error: any) {
        console.log("Some error in useUser hook");
        return null;
      }
    };

    getCurrentUser();
  }, []);

  return {
    profile,
  };
};
