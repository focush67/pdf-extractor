import { storage } from "./firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

export const uploadPDF = async (file: File) => {
  const storageRef = ref(storage, `/${file.name}`);
  try {
    const uploadTask = await uploadBytes(storageRef, file);
    console.log("PDF Uploaded Successfully");
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  } catch (error: any) {
    console.log("Some error in uploading file ", error.message);
    throw error;
  }
};
