const mongoose = require("mongoose");
const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} is invalid`);
  }
}

const isUniqueEmail = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email ${email} is already registered`);
  }
}

const existUserById = async (id = "") => {
  if ( mongoose.isValidObjectId( id ) ) {
    const existUser = await User.findById( id );
    if ( !existUser ) {
      throw new Error(`ID ${ id } does not exist`);
    }
  } else {
    throw new Error(`The id ${ id } is not valid`);
  }
}

module.exports = {
  isValidRole,
  isUniqueEmail,
  existUserById
}