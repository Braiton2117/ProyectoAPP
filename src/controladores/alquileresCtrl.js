import { conmysql } from "../db.js";

export const getAlquileres =
async (req, res) => {
    try {
        const [alquileres] = await conmysql.query("SELECT * FROM Alquileres");
        res.json(alquileres);
    } catch (error) {
        console.error("Error al obtener alquileres:", error);
        res.status(500).json({ message: "Error al obtener alquileres" });
    }
};

export const getAlquilerxid =
async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM Alquileres WHERE id_alquiler = ?", [req.params.id]);
        if (result.length <= 0) return res.status(404).json({ 
            id_alquiler:0,
            message: "Alquiler no encontrado" });
        res.json(result[0]);
    } catch (error) {
        console.error("Error al obtener alquiler:", error);
        res.status(500).json({ message: "Error del lado del servidor" });
    }
};

export const postAlquiler =
async (req, res) => {
    try {
        const { id_reserva, id_cliente, id_item, cantidad, precio_total } = req.body;

        const [result] = await conmysql.query(
            "INSERT INTO alquileres (id_reserva, id_cliente, id_item, cantidad, precio_total) VALUES (?, ?, ?, ?, ?)",
            [id_reserva, id_cliente, id_item, cantidad, precio_total]
        );

        res.status(201).json({
            message: "Alquiler creado exitosamente",
            id_alquiler: result.insertId,
        });
    } catch (error) {
        console.error("Error al crear alquiler:", error);
        res.status(500).json({ message: "Error del lado del servidor" });
    }
};

export const putAlquiler =
async (req, res) => {
    try {
        const {id} = req.params;
        const { id_reserva, id_cliente, id_item, cantidad, precio_total } = req.body;

        const [result] = await conmysql.query(
            "UPDATE alquileres SET id_reserva = ?, id_cliente = ?, id_item = ?, cantidad = ?, precio_total = ? WHERE id_alquiler = ?",
            [id_reserva, id_cliente, id_item, cantidad, precio_total, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Alquiler no encontrado" });

        const [updatedAlquiler] = await conmysql.query("SELECT * FROM alquileres WHERE id_alquiler = ?", [id]);
        res.json(updatedAlquiler[0]);
    } catch (error) {
        console.error("Error al actualizar alquiler:", error);
        res.status(500).json({ message: "Error del lado del servidor" });
    }
}

export const patchAlquiler = async (req, res) => {
    try {
        const {id} = req.params;
        const { id_reserva, id_cliente, id_item, cantidad, precio_total } = req.body;

        const [result] = await conmysql.query(
            "UPDATE alquileres SET id_reserva = IFNULL(?, id_reserva), id_cliente = IFNULL(?, id_cliente), id_item = IFNULL(?, id_item), cantidad = IFNULL(?, cantidad), precio_total = IFNULL(?, precio_total) WHERE id_alquiler = ?",
            [id_reserva, id_cliente, id_item, cantidad, precio_total, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Alquiler no encontrado" });

        const [updatedAlquiler] = await conmysql.query("SELECT * FROM alquileres WHERE id_alquiler = ?", [id]);
        res.json(updatedAlquiler[0]);
    } catch (error) {
        console.error("Error al actualizar parcialmente el alquiler:", error);
        res.status(500).json({ message: "Error del lado del servidor" });
    }
}

export const deleteAlquiler = async (req, res) => {
    try {
        const [result] = await conmysql.query("DELETE FROM alquileres WHERE id_alquiler = ?", [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Alquiler no encontrado" });

        res.sendStatus(202); // Eliminación exitosa
    } catch (error) {
        console.error("Error al eliminar alquiler:", error);
        res.status(500).json({ message: "Error del lado del servidor" });
    }
}
