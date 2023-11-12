import express from "express";
import {
  Login,
  Logout,
  Register,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controllers/UserController.js";
import IsAuth from "../Middlewares/IsAuth.js";
import { getPositions } from '../Controllers/PositionController.js';
import isOwner from './../Middlewares/IsOwner.js';

const route = express.Router();

route.get("/users",IsAuth, getUsers);
route.get("/users/:id",IsAuth,isOwner, getUser);
route.post("/register", Register); 
route.post("/login", Login);
route.post("/logout",IsAuth, Logout);
route.patch("/users/:id",IsAuth, updateUser);
route.delete("/users/:id",IsAuth, deleteUser);

route.get("/positions",IsAuth, getPositions);

export default route;
