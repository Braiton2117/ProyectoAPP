import { conmysql } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Obtener todos los usuarios
export const getUsuarios =
async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM Usuarios");
        res.json(result);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// buscamos un usuario por id
export const getUsuarioxid = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM Usuarios WHERE id_usuario = ?", [req.params.id]);
        if (result.length<=0)return res.status(404).json({
            id_usuario:0,
            message:"Usuario no encontrado"
        })
        res.json(result[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: "Error al obtener usuario" });
    }
};

// creamos un nuevo usuario
export const postUsuario = async (req, res) => {
    try {
        const { usuario,nombre, email, telefono, password } = req.body;
        const [existingUser] = await conmysql.query(
            "SELECT * FROM Usuarios WHERE usuario = ?",
            [usuario]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "El usuario ya está en uso." });
        }

        // Verificar si el nombre ya está en uso
        const [existingName] = await conmysql.query(
            "SELECT * FROM Usuarios WHERE nombre = ?",
            [nombre]
        );
        if (existingName.length > 0) {
            return res.status(400).json({ message: "El Nombre ya está en uso." });
        }
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await conmysql.query(
            "INSERT INTO Usuarios (usuario,nombre, email, telefono, password) VALUES (?, ?, ?, ?, ?)",
            [usuario,nombre, email, telefono, hashedPassword]
        );
        res.status(201).json({
            message: "Usuario creado correctamente",
            id_usuario: result.insertId,
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

export const putUsuario = async (req, res) => {
    try {
        const {id} = req.params;
        const { usuario,nombre, email, telefono, password } = req.body;
        const [result] = await conmysql.query(
            "UPDATE Usuarios SET usuario = ?, nombre = ?, email = ?, telefono = ?, password = ? WHERE id_usuario = ?",
            [usuario,nombre, email, telefono, password, id]
        )
        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const[rows]=await conmysql.query('select * from Usuarios where id_usuario=?',[id])
        res.json(rows[0])
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

// actulizamos el usuario por id
export const patchUsuario =
 async (req, res) => {
    try {
        const {id} = req.params;
        const { usuario,nombre, email, telefono, password } = req.body;
        const [result] = await conmysql.query(
            "UPDATE Usuarios SET usuario = IFNULL(?, usuario=), nombre = IFNULL(?, nombre), email = IFNULL(?, email), telefono = IFNULL(?, telefono), password = IFNULL(?, password) WHERE id_usuario = ?",
            [usuario,nombre, email, telefono, password, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario actualizado parcialmente" });
    } catch (error) {
        console.error("Error al actualizar parcialmente usuario:", error);
        res.status(500).json({ message: "Error al actualizar parcialmente usuario" });
    }
};

    // Eliminar un usuario por ID
    export const deleteUsuario=
    async(req,res)=>{
        try {
            //const {miid}=req.params
            const [rows]=await conmysql.query(' delete from Usuarios where id_usuario=?',[req.params.id])
            if(rows.affectedRows<=0)return res.status(404).json({
                id:0,
                message: "No pudo eliminar el usuario"
            })
            res.sendStatus(202).json({ message: 'Usuario eliminado' });
        } catch (error) {
            return res.status(500).json({message:"Error del lado del servidor"})
        }
    };
    export const login = async (req, res) => {
        const { usuario } = req.body;
    
        if (!usuario) {
            return res.status(400).json({ message: 'Por favor ingrese un usuario' });
        }
    
        try {
            // Buscar el usuario en la base de datos
            const [user] = await conmysql.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario]);
    
            if (!user.length) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            // Generar un token JWT solo con el usuario (sin necesidad de verificar la contraseña)
            const token = jwt.sign({ id: user[0].id_usuario, usuario: user[0].usuario }, JWT_SECRET, { expiresIn: '1h' });
    
            // Devolver el token en la respuesta
            res.json({
                auth: true,
                token,
                id_usuario: user[0].id_usuario,
                usuario: user[0].usuario
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    };