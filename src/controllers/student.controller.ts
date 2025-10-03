import { Request, Response } from "express";
import { StudentService } from "@services/student.service";
import { Student, StudentSchema } from "../types/definition";

export class StudentController{
    constructor(
        private readonly studentService: StudentService
    ){}

    public saveStudent = async (req: Request, res: Response) => {
        try {
            const parsed = StudentSchema.parse(req.body);
            const result = this.studentService.save(parsed);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}