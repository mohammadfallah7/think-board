import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RateLimitedAlert from "./components/RateLimitedAlert";
import { axiosInstance } from "./lib/utils";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/notes");
        switch (response.status) {
          case 200:
            setNotes(response.data);
            break;
          case 429:
            setRateLimited(true);
            break;
        }
      } catch (error) {
        console.error(error);
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
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h2>{note.title}</h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
