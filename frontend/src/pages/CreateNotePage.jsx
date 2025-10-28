import { LucideArrowLeft, LucideLoader2 } from "lucide-react";
import { Link } from "react-router";
import useCreateNote from "../hooks/use-create-note";

const CreateNotePage = () => {
  const { loading, note, setNote, mutate: createNote } = useCreateNote();

  const handleSubmit = (event) => {
    event.preventDefault();
    createNote();
  };

  return (
    <div className="max-w-2xl px-3 mx-auto">
      <div className="mt-6 space-y-10">
        <Link to="/" className="btn btn-ghost">
          <LucideArrowLeft className="size-4" />
          <span>Back to notes</span>
        </Link>
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create new note</h2>
            <form onSubmit={handleSubmit} className="">
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
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary"
                >
                  Create
                  {loading && <LucideLoader2 className="size-4 animate-spin" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotePage;
