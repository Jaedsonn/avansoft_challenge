import { Student, DefaultMessage } from "./types/definition";
import { findFirstNotRepeatableChar } from "./utils/firstNotRepeatableChar";
import { randomUUID } from "node:crypto";

interface IDataSource {
  save: (student: Student) => DefaultMessage;
  getAll: () => DefaultMessage;
  getById: (id: string) => DefaultMessage;
}

export default class DataRepository implements IDataSource {
  private static instance: DataRepository;

  private constructor(
    private readonly dataSource: Student[] = [],
  ) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DataRepository();
    }
    return this.instance;
  }

  public save(student: Student) {
    try {
      const isExist = this.verifyExistence(student.name);
      if (isExist) {
        throw new Error("Student already exists");
      }
      const studentWithId = {
        ...student,
        id: randomUUID(),
      };
      this.dataSource.push(studentWithId);
      return {
        success: true,
        message: "Student saved successfully",
        data: {
          ...studentWithId,
          firstNotRepeatableChar: findFirstNotRepeatableChar(
            studentWithId.name
          ),
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to save student",
      };
    }
  }

  public getAll() {
    try {
      const students = this.dataSource.map((s) => ({
        ...s,
        firstNotRepeatableChar: findFirstNotRepeatableChar(s.name),
      }));
      return {
        success: true,
        message: "Students retrieved successfully",
        data: students,
      };
    } catch (error: any) {
      return { success: false, message: "Failed to retrieve students" };
    }
  }

  public getById(id: string) {
    try {
      const student = this.dataSource.find((s) => s.id === id);
      if (student) {
        return {
          success: true,
          message: "Student retrieved successfully",
          data: {
            ...student,
            firstNotRepeatableChar: findFirstNotRepeatableChar(student.name),
          },
        };
      } else {
        throw new Error("Student not found");
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  private verifyExistence(name: string) {
    const student = this.dataSource.find(
      (s) => s.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (student) {
      return true;
    } else {
      return false;
    }
  }
}
export const dataSource: Student[] = [];
