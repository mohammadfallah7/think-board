import { LucideArrowLeft, LucideLoader2, LucideTrash2 } from "lucide-react";
import { Link, useParams } from "react-router";
import Loading from "../components/Loading";
import useDeleteNote from "../hooks/use-delete-note";
import useNote from "../hooks/use-note";
import useUpdateNote from "../hooks/use-update-note";

const NoteDetailsPage = () => {
  const { id } = useParams();

  const { note, setNote, loading } = useNote(id);
  const { isUpdating, mutate: updateNote } = useUpdateNote();
  const { isDeleting, mutate: deleteNote } = useDeleteNote(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateNote(note);
  };

  const handleDelete = () => {
    deleteNote(id);
  };

  if (loading) return <Loading message="Loading note..." />;

  return (
    <div className="max-w-2xl px-3 mx-auto">
      <div className="mt-6 space-y-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="btn btn-ghost">
            <LucideArrowLeft className="size-4" />
            <span>Back to notes</span>
          </Link>
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="btn btn-error btn-outline"
          >
            {isDeleting ? (
              <LucideLoader2 className="size-4 animate-spin" />
            ) : (
              <LucideTrash2 className="size-4" />
            )}
            Delete note
          </button>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create new note</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4 gap-2">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Note title"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col mb-4 gap-2">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="w-full textarea resize-none h-32"
                  placeholder="Write your note here..."
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  disabled={isUpdating}
                  type="submit"
                  className="btn btn-primary"
                >
                  Save changes
                  {isUpdating && (
                    <LucideLoader2 className="size-4 animate-spin" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
