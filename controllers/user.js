const User = require("../models/user");
const passport = require("passport");

module.exports.signUp =  async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "User is Registered SuccessFully ! ");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to RentMate !");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logOut =  (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are Logged Out !");
    res.redirect("/login");
  });
}

module.exports.userLogin =  (req, res) => {
  res.render("Users/login");
}

module.exports.userSignUp =  (req, res) => {
  res.render("Users/signUp");
}