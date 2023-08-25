const { default: mongoose } = require("mongoose");

const imageSchema = mongoose.Schema({
  imageName: {
    type: String,
  },
  path: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
