import { LucideLoader2, LucidePenSquare, LucideTrash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { axiosInstance, formatDate } from "../lib/utils";

const NoteCard = ({ note, onDeleteNote }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      onDeleteNote(id);
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
      setLoading(false);
    }
  };

  return (
    <li className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-200 border-t-4 border-primary">
      <div className="card-body">
        <Link to={`/note/${note._id}`}>
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        </Link>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <Link to={`/note/${note._id}`}>
              <LucidePenSquare className="size-4" />
            </Link>
            <button
              disabled={loading}
              onClick={() => handleDelete(note._id)}
              className="btn btn-ghost btn-xs text-error"
            >
              {loading ? (
                <LucideLoader2 className="size-4 animate-spin" />
              ) : (
                <LucideTrash2 className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NoteCard;
