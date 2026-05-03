import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteByID,
  updateNote,
} from "../controllers/notes.controllers.js";

const router = Router();

// router.get("/", (req, res) => {
//   res.status(200).send("You got 5 notes");
// });

router.route("/").get(getAllNotes);
router.route("/:id").get(getNoteByID);
router.route("/").post(createNote);
router.route("/:id").put(updateNote);
router.route("/:id").delete(deleteNote);

export default router;
