import { Router } from "express";
import {
  getAllClients,
  createClient,
  createClientAdmin,
  updateClient,
  deleteClient,
  loginClient,
  getClientAdmin,
  updateClientAdmin
} from "../controllers/client.controller.js";


const router = Router();
router.get("/client/:tipo/:filtro?", getAllClients);
router.put("/client/:id", updateClient);
router.post("/client", createClient);
router.post("/client_admin", createClientAdmin);
router.get("/client_admin/:id", getClientAdmin);
router.put("/client_admin/:id", updateClientAdmin);

router.delete("client/:id", deleteClient);

router.post("/client/login", loginClient);


export default router;
