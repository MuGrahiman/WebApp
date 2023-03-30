const router = require("express").Router();
const { User } = require("../models/user.js");
const joi = require("joi");
const bcrypt = require("bcrypt");
const { valid } = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .send({ messege: "user with this email   address already exits" });
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.status(401).send({ messege: "Invalid Email or Password" });
        } else {
          const token = user.genarateAuthToken();
          res
            .status(200)
            .send({ data: token, messege: "Logged In Successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ messege: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
