import User from "../models/User.js";

// REGISTRO
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Usuario ya registrado" });

    const newUser = await User.create({ username, email, password });

    res.json({ msg: "Usuario registrado", user: newUser });
  } catch (err) {
    res.status(500).json({ msg: "Error en servidor", err });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "No existe ese usuario" });

    if (password !== user.password)
      return res.status(400).json({ msg: "Contraseña incorrecta" });

    res.json({ msg: "Login exitoso", user });
  } catch (err) {
    res.status(500).json({ msg: "Error en servidor", err });
  }
};
