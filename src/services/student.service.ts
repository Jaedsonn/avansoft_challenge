import DataRepository from "../data";
import { Student } from "../types/definition";

export class StudentService{
    constructor(
        private readonly dataRepository: DataRepository
    ){}

    public save(student: Student){
        return this.dataRepository.save(student);
    }

    public findAll(){
        return this.dataRepository.getAll();
    }
}