const User = require("../models/user.model");

const getAllUserData = async (req, res) => {
  // #swagger.tags = ['User data']
  /* #swagger.responses[200] = {
            description: 'User get successfully.',
            schema: { $ref: '#/definitions/User' }
    } */
  try {
    const userData = await User.find({ email: req.params.email });

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUserData = async (req, res) => {
  // #swagger.tags = ['User data']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Adding new user.',
                schema: { $ref: '#/definitions/AddUser' }
        } */
  const { name, phone, email, image } = req.body;
  try {
    const newUser = new User({
      name: name,
      phone: phone,
      email: email,
      image: image,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUserData = async (req, res) => {
  // #swagger.tags = ['User data']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Update user data.',
                schema: { $ref: '#/definitions/UpdateUser' }
        } */
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
  // #swagger.tags = ['User data']
  try {
    const userData = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      id: req.params.id,
      message: "User deleted successfully",
    });
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
