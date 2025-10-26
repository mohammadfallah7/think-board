import useNotes from "../hooks/use-notes";
import Container from "./Container";
import Loading from "./Loading";
import RateLimitedAlert from "./RateLimitedAlert";

const NotesGrid = () => {
  const { notes, loading, rateLimited } = useNotes();

  if (loading) return <Loading message="Loading notes..." />;

  if (rateLimited)
    return (
      <div className="py-6">
        <RateLimitedAlert />
      </div>
    );

  return (
    <Container>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <li key={note._id}>
            <h2>{note.title}</h2>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default NotesGrid;
