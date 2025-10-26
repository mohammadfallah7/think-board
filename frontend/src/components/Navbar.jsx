import Container from "./Container";
import { Link } from "react-router";
import { LucidePlus } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="text-primary font-mono tracking-tight text-3xl font-bold"
          >
            ThinkBoard
          </Link>
          <Link to="/create" className="btn btn-primary">
            <LucidePlus className="size-4" />
            <span>New Note</span>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
