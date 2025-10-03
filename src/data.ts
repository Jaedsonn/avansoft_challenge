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
    getAll: () => DefaultMessage;
    getById: (id: string) => DefaultMessage;
    save: (student: Student) => DefaultMessage;
}

export const dataSource: Student[] = [];


