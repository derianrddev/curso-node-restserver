const mongoose = require("mongoose");
const { Role, User, Category, Product } = require("../models");

/* 
  User validations
*/

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

/* 
  Category validations
*/

const existCategoryById = async (id = "") => {
  if ( mongoose.isValidObjectId( id ) ) {
    const existCategory = await Category.findById( id );
    if ( !existCategory ) {
      throw new Error(`ID ${ id } does not exist`);
    }
  } else {
    throw new Error(`The id ${ id } is not valid`);
  }
}

const isUniqueCategory = async (name = "") => {
  name = name.toUpperCase();

  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    throw new Error(`The category ${name} is already registered`);
  }
}

/* 
  Product validations
*/

const existProductById = async (id = "") => {
  if ( mongoose.isValidObjectId( id ) ) {
    const existProduct = await Product.findById( id );
    if ( !existProduct ) {
      throw new Error(`ID ${ id } does not exist`);
    }
  } else {
    throw new Error(`The id ${ id } is not valid`);
  }
}

const isUniqueProduct = async (name = "") => {
  name = name.toUpperCase();

  const existProduct = await Product.findOne({ name });
  if (existProduct) {
    throw new Error(`The product ${name} is already registered`);
  }
}

const existCategory = async (name = "") => {
  name = name.toUpperCase();

  const existCategory = await Category.findOne({ name });
  if (!existCategory) {
    throw new Error(`The category ${name} does not exist`);
  }
}

module.exports = {
  isValidRole,
  isUniqueEmail,
  existUserById,
  existCategoryById,
  isUniqueCategory,
  existProductById,
  isUniqueProduct,
  existCategory
}