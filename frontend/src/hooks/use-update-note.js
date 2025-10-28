import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/utils";

const useUpdateNote = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const mutate = async (note) => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setIsUpdating(true);
    try {
      await axiosInstance.put(`/notes/${note._id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      switch (error.response.status) {
        case 400:
          toast.error(error.response.data.message);
          break;
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
          toast.error("Failed to update note!");
          break;
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, mutate };
};

export default useUpdateNote;
