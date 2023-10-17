import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/courses", (req, res) => {
  res.send(courses);
});

app.use("/login", (req, res) => {
  res.send(users);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (!user) {
    return res.status(404).send("User not Found!");
  }
  return res.status(200).json(user);
});

app.listen(7999, () =>
  console.log("API is running on http://localhost:7999/api/courses")
);

const users = [
  {
    username: "User0001",
    password: "Pass0001",
  },
  {
    username: "User0002",
    password: "Pass0002",
  },
  {
    username: "User0003",
    password: "Pass0003",
  },
];

const courses = [
  {
    id: "01420111",
    name: "General Physics I",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420112",
    name: "General Physics II",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420113",
    name: "Laboratory in Physics I",
    type: "Laboratory",
    credit: "1",
  },
  {
    id: "01420114",
    name: "Laboratory in Physics II",
    type: "Laboratory",
    credit: "1",
  },
  {
    id: "01420211",
    name: "Mechanics I",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420213",
    name: "Mathematical Physics I",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420221",
    name: "Modern Physics",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420222",
    name: "Laboratory in Modern Physics",
    type: "Laboratory",
    credit: "1",
  },
  {
    id: "01420243",
    name: "Introduction to Electronics",
    type: "Lecture",
    credit: "2",
  },
  {
    id: "01420244",
    name: "Laboratory in Introduction to Electronics",
    type: "Laboratory",
    credit: "1",
  },
  {
    id: "01420261",
    name: "Electromagnetics I",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420262",
    name: "Laboratory in Electromagnetics",
    type: "Laboratory",
    credit: "1",
  },
  {
    id: "01420321",
    name: "Quantum Mechanics I",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420331",
    name: "Thermodynamics",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420332",
    name: "Statistical Mechanics",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420334",
    name: "Laboratory in Thermodynamics",
    type: "Laboratory",
    credit: "1",
  },
  {
    id: "01420366",
    name: "Physics of Waves",
    type: "Lecture",
    credit: "3",
  },
  {
    id: "01420497",
    name: "Seminar",
    type: "Lecture",
    credit: "1",
  },
  {
    id: "01420499",
    name: "Physics Project",
    type: "Lecture",
    credit: "3",
  },
];
