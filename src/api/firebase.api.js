import {storage} from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
export const uploadImage = async (file, setUrl) => {
  try {
    if (!file) return null;
    const storageRef = ref(storage, `book/${file.name}`);
    
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
      });
    });
  } catch (error) {
    return error;
  }
};
