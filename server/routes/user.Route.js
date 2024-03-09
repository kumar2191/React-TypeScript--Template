import express from "express"
import { getAllUser, getSingleUser, deleteUser, updateUser, createUser } from "../controller/users.Controller.js"

const router = express.Router()
// get all user
// http://localhost:5000/api/v1/users
router.get("/", getAllUser);

// get single user
// http://localhost:5000/api/v1/users/:id
router.get("/:id", getSingleUser);

// create user
// http://localhost:5000/api/v1/users
router.post("/", createUser);

// update user
// http://localhost:5000/api/v1/users/:id
router.put("/:id", updateUser)

// delete user
// http://localhost:5000/api/v1/users/:id
router.delete("/:id", deleteUser);


export default router;