"use strict";

import Admin from "../models/Admin.js";
import bcrypt from "bcrypt-nodejs";
import {createToken} from "../helpers/jwt.js"

//GET ALL CLIENTS
export const getAllAdmins = async (req, res) => {
  res.status(200).send({ message: "hola que hola" });
};
//END GET ALL CLIENTS

export const createAdmin = async (req, res) => {
  const adminData = req.body;

  const admin_arr = await Admin.find({ email: adminData.email });

  if (admin_arr.length === 0) {
    if (adminData.password) {
      bcrypt.hash(adminData.password, null, null, async (err, hash) => {
        if (hash) {
          adminData.password = hash;
          const newAdmin = await Admin.create(adminData);
          res.status(200).send({ data: newAdmin});
        } else {
          res.status(200).send({ message: "There ara not a password!" });
        }
      });
    }
  } else {
    res
      .status(200)
      .send({ message: "the email already exist!", data: undefined });
  }
};

// UPDATE A CLIENT
export const updateAdmin = async (req, res) => {};
// END UPDATE CLIENT

//DELETE CLIENT
export const deleteAdmin = async (req, res) => {};
// END DELETE CLIENT
export const getAdmin = async (req, res) => {};

// LOGIN CLIENT

export const loginAdmin = async (req, res) => {
  const adminData = req.body;
  const admin_arr = await Admin.find({ email: adminData.email });

  if (admin_arr.length == 0) {
    res
      .status(200)
      .send({ message: "error user does not exits!", data: undefined });
  } else {
    let user = admin_arr[0];
    bcrypt.compare(adminData.password, user.password, async (error, check) => {
      if (check) {
        res.status(200).send({ data: user, token: createToken(user) });
      } else {
        res
          .status(200)
          .send({ message: "error password does not exits!", data: undefined });
      }
    });
  }
};
