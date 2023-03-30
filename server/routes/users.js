const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
router.post("/", async (req, res) => {
  try {
    console.log("some thing reached"+req.body.email);
    const { error } = validate(req.body);
    if (error) {
      console.log(error)
      return res.status(400).send({ message: error.details[0].message });
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(409)
          .send({ messege: "user with this email   address already exits" });
      } else {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new user({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ messege: "User created successfully" });
      }
    }
  } catch (error) {
    res.status(500).send({ messege: "Internal Server Error" });
  }
});

module.exports = router;
