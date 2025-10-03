import { Request, Response } from "express";
import { StudentService } from "@services/student.service";
import { StudentSchema } from "../types/definition";

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  public saveStudent = async (req: Request, res: Response) => {
    try {
      const parsed = StudentSchema.parse(req.body);
      const result = this.studentService.save(parsed);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      if (error.name === "ZodError") {
        const errorMessages = error.errors
          .map((err: any) => err.message)
          .join(", ");
        res.status(400).json({
          success: false,
          message: errorMessages,
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message || "Bad Request",
        });
      }
    }
  };

  public getAllStudents = (req: Request, res: Response) => {
    try {
      const students = this.studentService.findAll();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };

  public getStudentById = (req: Request, res: Response) => {
    try {
      const id = req.params?.id;
      if (!id) throw new Error("ID is required");
      const result = this.studentService.findById(id);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
}
