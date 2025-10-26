import { LucidePenSquare, LucideTrash2 } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note }) => {
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
            <button className="btn btn-ghost btn-xs text-error">
              <LucideTrash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NoteCard;
