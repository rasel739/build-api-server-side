const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const userRouter = require("./routes/users.route");
const singupRouter = require("./routes/signup.route");
const loginUser = require("./routes/login.route");
const resetPassword = require("./routes/passwordreset.route");

require("./config/db");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Build Api",
      version: "1.0.0",
      description: "A simple Express Build Api",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["app.js"],
};
const specs = swaggerJsDoc(options);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user name
 *         phone:
 *           type: string
 *           description: The user phone
 *         email:
 *           type: string
 *           description: The user email
 *         image:
 *           type: object
 *           description: The user image
 *       example:
 *         name: Rasel Hossain
 *         phone: 01309583855
 *         email: raselh@gmail.com
 *         image: object
 */

/**
 * @swagger
 * /api/user/{email}:
 *   get:
 *     summary: Get the user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email
 *     responses:
 *       200:
 *         description: The all user
 *         contens:
 *           application/json:
 *
 *       404:
 *         description: The user was not found
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *  patch:
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api/user", userRouter);
app.use("/usersignup", singupRouter);
app.use("/loginUser", loginUser);
app.use("/resetPassword", resetPassword);

//get server home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

//routes not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found Routes" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Sumthing wrong Not Found File!" });
});

module.exports = app;
