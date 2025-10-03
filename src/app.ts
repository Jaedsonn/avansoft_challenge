import express from "express";
import { StudentRouter } from "@router/student.routes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/students", StudentRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
