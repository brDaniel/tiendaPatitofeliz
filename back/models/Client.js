"use strict";
import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  country: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String, default: "perfil.png", required: true },
  tel: { type: String, required: false },
  gender: { type: String, required: false },
  birthday: { type: String, required: false },
  dni: { type: String, required: false },
});

export default mongoose.model("Client", ClientSchema);
