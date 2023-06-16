"use strict";

import Client from "../models/Client.js";
import bcrypt from "bcrypt-nodejs";
import { createToken } from "../helpers/jwt.js";

//GET ALL CLIENTS
export const getAllClients = async (req, res) => {
  let tipoFiltro = req.params["tipo"];
  let filtro = req.params["filtro"];

  if (tipoFiltro == null || tipoFiltro == "null") {
    const clients = await Client.find();
    res.status(200).send({ data: clients });
  } else {
    if (tipoFiltro == "apellidos") {
      const clients = await Client.find({ last_name: new RegExp(filtro, "i") });
      res.status(200).send({ data: clients });
    }

    if (tipoFiltro == "email") {
      const clients = await Client.find({ email: new RegExp(filtro, "i") });
      res.status(200).send({ data: clients });
    }
  }
};
//END GET ALL CLIENTS

// CREATE A NEW CLIENT
export const createClient = async (req, res) => {
  const clientData = req.body;

  const client_arr = await Client.find({ email: clientData.email });

  if (client_arr.length === 0) {
    if (clientData.password) {
      bcrypt.hash(clientData.password, null, null, async (err, hash) => {
        if (hash) {
          clientData.password = hash;
          const newClient = await Client.create(clientData);
          res.status(200).send({ data: newClient });
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

export const createClientAdmin = async (req, res) => {
  const clientData = req.body;

  const client_arr = await Client.find({ email: clientData.email });

  if (client_arr.length == 0) {
    bcrypt.hash("123456789", null, null, async (err, hash) => {
      if (hash) {
        clientData.password = hash;
        const newClient = await Client.create(clientData);
        res.status(200).send({ data: newClient });
      } else {
        res.status(200).send({ message: "There ara not a password!" });
      }
    });
  } else {
    res
      .status(200)
      .send({ message: "the email already exist!", data: undefined });
  }
};
// CREATE A NEW CLIENT

// UPDATE A CLIENT
export const updateClient = async (req, res) => {};

// UPDATE A CLIENT ADMIN
export const updateClientAdmin = async (req, res) => {
  const id = req.params["id"];
  const data = req.body;
  try {
    const client = await Client.findByIdAndUpdate(
      { _id: id },
      {
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        email: data.email,
        tel: data.tel,
        gender: data.gender,
        birthday: data.birthday,
      },
    );
    res.status(200).send({ data: client });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};
// END UPDATE CLIENT

//DELETE CLIENT
export const deleteClient = async (req, res) => {};
// END DELETE CLIENT
export const getClientAdmin = async (req, res) => {
  const id = req.params["id"];
  try {
    const client = await Client.findById({ _id: id });
    res.status(200).send({ data: client });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

// LOGIN CLIENT

export const loginClient = async (req, res) => {
  const clientData = req.body;
  const arr_client = await Client.find({ email: clientData.email });

  if (arr_client.length == 0) {
    res
      .status(200)
      .send({ message: "this user does not exits!", data: undefined });
  } else {
    let user = arr_client[0];

    bcrypt.compare(clientData.password, user.password, async (error, check) => {
      if (check) {
        res.status(200).send({ data: user, token: createToken(user) });
      } else {
        res
          .status(200)
          .send({ message: "this password does not exits!", data: undefined });
      }
    });
  }
};
