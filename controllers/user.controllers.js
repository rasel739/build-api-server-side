const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");

const getAllUserData = async (req, res) => {
  try {
    const userData = await User.find({ email: req.params.email });

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUserData = async (req, res) => {
  const { name, phone, email, image } = req.body;
  try {
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image, {
        upload_preset: "Build-Api",
      });

      if (uploadImage) {
        const newUser = new User({
          name: name,
          phone: phone,
          email: email,
          image: uploadImage,
        });
        await newUser.save();
        res.status(200).json(newUser);
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUserData = async (req, res) => {
  try {
    const userUpdate = await User.findOne({ _id: req.params.id });
    userUpdate.name = req.body.name;
    userUpdate.phone = req.body.phone;

    await userUpdate.save();
    res.status(201).json(userUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUserData = async (req, res) => {
  try {
    const userData = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(req.params.id);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUserData,
  createUserData,
  updateUserData,
  deleteUserData,
};
