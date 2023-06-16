"use strict";

import jwt from "jwt-simple";
import moment from "moment";
const secret = "Mitienda";

export const createToken = (user) => {
  const payload = {
    sub: user.id,
    name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().add(7, "days").unix,
  };
  return jwt.encode(payload, secret);
};
