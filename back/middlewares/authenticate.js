'use strict'
import jwt from 'jwt-simple';
import moment from 'moment'

const secret = 'Mitienda'

exports.auth = function(req,res,next){
  console.log(req.headers)
}