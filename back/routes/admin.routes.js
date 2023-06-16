import { Router } from "express";
import {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
} from "../controllers/admin.controller.js";

const router = Router();
router.get("/admin", getAllAdmins);
router.post("/admin", createAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("admin/:id", deleteAdmin);
router.get("/admin/:id", getAdmin);
router.post("/admin_login", loginAdmin);


export default router;
