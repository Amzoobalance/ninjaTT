const ApiError = require("../error/apiError");

class AuthController {
  async login(req, res) {
    const login = req.body.login;
    const password = req.body.password;

    if (login === process.env.LOGIN && password === process.env.PASSWORD) {
      res.cookie(process.env.COOKIE_NAME, true);
      return res.json({ success: true });
    }
    return res.json({ success: false });
  }

  async logout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
    return res.json({ success: true });
  }
}

module.exports = new AuthController();
