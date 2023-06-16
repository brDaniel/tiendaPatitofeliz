import mongoose from "mongoose";

export async function conectDB() {
  try {
    const db = await mongoose.connect("mongodb://localhost/mybase");
    console.log("Conected to", db.connection.name);
  } catch (err) {
    console.log(err);
  }
}
