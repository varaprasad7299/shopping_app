const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.Pass_sec
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("wrong username");

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.Pass_sec
    );
    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (OriginalPassword !== req.body.password)
      return res.status(401).json("wrong password");

    const accestoken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.Pass_sec,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accestoken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
