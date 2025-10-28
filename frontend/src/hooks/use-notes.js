import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/utils";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/notes");
        setRateLimited(false);
        setNotes(response.data.data);
      } catch (error) {
        console.error(error);
        if (error.response.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, setNotes, loading, rateLimited };
};

export default useNotes;
