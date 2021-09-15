const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.cookie("token", token, { maxAge: 8640000 });
    res.redirect("/");
    //res.send(201);
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await User.authenticate(user);
    res.cookie("token", token, { maxAge: 8640000 });
    res.send(201);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.cookies.token));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/logout", async (req, res, next) => {
  try {
    let cookie = req.cookies.token;
    if (cookie === undefined) {
      console.log("No Cookie Destroyed");
    } else {
      res.cookie("token", "", { maxAge: 0 });
      console.log("Cookie Destroyed");
    }
    res.send(204);
  } catch (ex) {
    next(ex);
  }
});
