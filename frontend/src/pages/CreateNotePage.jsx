import { LucideArrowLeft, LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib/utils";

const CreateNotePage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
