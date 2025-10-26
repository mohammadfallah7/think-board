import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RateLimitedAlert from "./components/RateLimitedAlert";
import { axiosInstance } from "./lib/utils";
import { toast } from "react-hot-toast";
import { LucideLoader2 } from "lucide-react";
import Loading from "./components/Loading";
import Container from "./components/Container";

const App = () => {
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

  return (
    <>
      <Navbar />
      {rateLimited && (
        <div className="py-6">
          <RateLimitedAlert />
        </div>
      )}
      <Container>
        {loading ? (
          <Loading message="Loading notes..." />
        ) : (
          notes.length > 0 && (
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <li key={note._id}>
                  <h2>{note.title}</h2>
                </li>
              ))}
            </ul>
          )
        )}
      </Container>
    </>
  );
};

export default App;
