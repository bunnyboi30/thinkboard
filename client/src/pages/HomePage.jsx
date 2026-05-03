import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import RateLimitUI from "../components/RateLimitUI.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import api from "../lib/axios.js";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error Fetching Data", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load Notes");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}

        {notes.length <= 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
