import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/utils";

const useCreateNote = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mutate = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/notes", note);
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      switch (error.response.status) {
        case 400:
          toast.error(error.response.data.message);
          break;
        case 429:
          toast.error("Rate limit exceeded! Please try again later.");
          break;
        case 500:
          toast.error(error.response.data.message);
          break;
        default:
          toast.error("Failed to create note!");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { note, setNote, loading, mutate };
};

export default useCreateNote;
