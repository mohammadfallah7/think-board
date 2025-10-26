import { createBrowserRouter } from "react-router";
import App from "./App";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/create", Component: CreateNotePage },
  { path: "/note/:id", Component: NoteDetailsPage },
]);

export default router;
