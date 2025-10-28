import useNotes from "../hooks/use-notes";
import Container from "./Container";
import Loading from "./Loading";
import NoteCard from "./NoteCard";
import NotesEmptyView from "./NotesEmptyView";
import RateLimitedAlert from "./RateLimitedAlert";

const NotesGrid = () => {
  const { notes, setNotes, loading, rateLimited } = useNotes();

  if (loading) return <Loading message="Loading notes..." />;

  if (rateLimited)
    return (
      <div className="py-6">
        <RateLimitedAlert />
      </div>
    );

  return (
    <Container>
      {notes.length > 0 ? (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDeleteNote={(id) => {
                setNotes(notes.filter((n) => n._id !== id));
              }}
            />
          ))}
        </ul>
      ) : (
        <NotesEmptyView />
      )}
    </Container>
  );
};

export default NotesGrid;
