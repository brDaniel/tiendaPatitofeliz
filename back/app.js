"use strict";
import express from "express";
import { conectDB } from "./db.js";
import clientRoute from "./routes/client.routes.js";
import adminRoute from "./routes/admin.routes.js"
const app = express();

const port = process.env.PORT || 4201;
conectDB();

app.listen(port);
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit: '50mb',extended:true}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Autorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Acces-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});
app.use(clientRoute);
app.use(adminRoute);
export default app;
