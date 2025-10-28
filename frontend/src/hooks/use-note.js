import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/utils";

const useNote = (id) => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/notes/${id}`);
        setNote(response.data.data);
      } catch (error) {
        switch (error.response.status) {
          case 404:
            toast.error(error.response.data.message);
            break;
          case 429:
            toast.error("Rate limit exceeded! Please try again later.");
            break;
          case 500:
            toast.error(error.response.data.message);
            break;
          default:
            toast.error("Failed to fetch note");
            break;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return { note, setNote, loading };
};

export default useNote;
