"use strict";
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  tel: { type: String, required: true },
  rol: { type: String, required: true },
});

export default mongoose.model("Admin", AdminSchema);
