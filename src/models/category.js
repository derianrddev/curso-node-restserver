const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategorySchema.methods.toJSON = function() {
  const { __v, status, ...category } = this.toObject();

  if (category.user._id){
    category.user.uid = category.user._id
    delete category.user._id
  }

  return category;
}

module.exports = model("Category", CategorySchema);
