const authService = require("../services/auth.service");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge:   7 * 24 * 60 * 60 * 1000,
};

const register = async (req, res) => {
  try {
    const { name, email, password, business } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Name, email and password are required" });
    if (password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    const { user, token } = await authService.register(name, email, password, business);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ success: true, user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });
    const { user, token } = await authService.login(email, password);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ success: true, user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = (_req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
};

const me = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json({ success: true, user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { register, login, logout, me };

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ error: "Email and new password are required" });
    if (newPassword.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    const { rows } = await require("../db/database").pool.query(
      "SELECT id FROM users WHERE email = $1", [email.toLowerCase().trim()]
    );
    if (!rows[0]) return res.status(404).json({ error: "No account found with that email" });
    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(newPassword, 10);
    await require("../db/database").pool.query(
      "UPDATE users SET password = $1 WHERE email = $2", [hashed, email.toLowerCase().trim()]
    );
    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, logout, me, resetPassword };
