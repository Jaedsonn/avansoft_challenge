import { StudentController } from "@controllers/student.controller";
import { StudentService } from "@services/student.service";
import DataRepository from "data";

export default class Factory {
  public static createStudentController() {
    return new StudentController(new StudentService(DataRepository.getInstance()));
  }
}
