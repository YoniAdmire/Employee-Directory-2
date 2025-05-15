import express from "express";
import employees from "../db/employees.js";

const router = express.Router();

// GET /employees
router.get("/", (req, res) => {
  res.json(employees);
});

// GET /employees/random
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// GET /employees/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);
  if (!employee) {
    return res.status(404).send(`Employee with id ${id} not found`);
  }
  res.json(employee);
});

// POST /employees
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).send("Missing or invalid 'name'");
  }

  const newEmployee = {
    id: employees.length + 1,
    name,
    role: "New Hire"
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

export default router;
