import { Student, DefaultMessage } from "./types/definition"

interface IDataSource{
    save: (student: Student) => DefaultMessage;
    getAll: () => DefaultMessage;
    getById: (id: string) => DefaultMessage;
}

export default class DataRepository implements IDataSource{

    constructor(
        private readonly dataSource: Student[] = []
    ){}
    
    public save(student: Student) {
        try {
            this.dataSource.push(student);
            return { success: true, message: "Student saved successfully" };
        } catch (error) {
            return { success: false, message: "Failed to save student" };
        }
    }

    public getAll(){
        try {
            const students = this.dataSource;
            return { success: true, message: "Students retrieved successfully", data: students };
        } catch (error) {
            return { success: false, message: "Failed to retrieve students" };
        }
    }

    public getById(id: string) {
        try {
            const student = this.dataSource.find(s => s.id === id);
            if (student) {
                return { success: true, message: "Student retrieved successfully", data: student };
            } else {
                throw new Error("Student not found");
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

export const dataSource: Student[] = [];


