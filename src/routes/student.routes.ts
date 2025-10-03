import { Router } from "express";
import Factory from "../factory";

export const StudentRouter = Router();

StudentRouter.post("/", Factory.createStudentController().saveStudent);
StudentRouter.get("/", Factory.createStudentController().getAllStudents);
StudentRouter.get("/:id", Factory.createStudentController().getStudentById);
