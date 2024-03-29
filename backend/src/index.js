import express from "express";
import userController from "./controllers/users/usersController.js";
import authController from "./controllers/users/authController.js";
import passwordController from "./controllers/users/passwordController.js";
import dentistController from "./controllers/dentists/dentistController.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// User-related routes
app.use("/users", userController);

// Authentication-related routes
app.use("/auth", authController);

// Password-related routes
app.use("/password", passwordController);

app.use("/dentist", dentistController);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
