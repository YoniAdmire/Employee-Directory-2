import express from "express";
import employeesRouter from "./routes/employees.router.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);


app.use(errorHandler);

export default app;
