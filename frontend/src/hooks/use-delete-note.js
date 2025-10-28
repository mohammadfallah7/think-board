import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/utils";

const useDeleteNote = (redirect, onDeleteNote) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const mutate = async (id) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      if (redirect) {
        navigate("/");
      } else {
        onDeleteNote(id);
      }
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
          toast.error("Failed to delete note!");
          break;
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, mutate };
};

export default useDeleteNote;
