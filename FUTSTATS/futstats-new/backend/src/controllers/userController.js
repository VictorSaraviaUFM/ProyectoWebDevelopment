import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Crear Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        const newUser = await User.create({ username, email, password });

        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token: generateToken(newUser._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        res.json({
            message: "Inicio de sesión exitoso",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
