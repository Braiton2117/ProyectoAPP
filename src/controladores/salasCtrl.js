import { conmysql } from "../db.js";

//todas las salas
export const getSalas= 
async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM Salas");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener salas:", error);
    res.status(500).json({ message: "Error al obtener salas" });
  }
}

//sala por su ID
export const getSalaxid= 
async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM Salas WHERE id_sala = ?", [req.params.id]);
    if (result.length <= 0)
      return res.status(404).json({
        id_sala: 0,
        message: "Sala no encontrada",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}
export const postSala = 
async (req, res) => {
  try {
    const { nombre_sala, capacidad, ubicacion, precio } = req.body;

    let imagen = null;
    if (req.file) {
      imagen = `/uploads/${req.file.filename}`; // Ruta del archivo subido
    }

    const [rows] = await conmysql.query(
      "INSERT INTO Salas (nombre_sala, capacidad, ubicacion, precio, imagen) VALUES (?, ?, ?, ?, ?)",
      [nombre_sala, capacidad, ubicacion, precio, imagen]
    );

    res.status(201).json({
      message: "Sala creada correctamente",
      id_sala: rows.insertId,
      imagen: imagen,
    });
  } catch (error) {
    console.error("Error en postSala:", error);
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}
export const putSala = 
async (req, res) => {
  try {
    const {id} = req.params;
    console.log("ID del producto a actualizar:", id);  //CONSOLA PUESTA
    console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);   //CONSOLA PUESTA
    console.log("Archivo de imagen recibido:", req.file);   //CONSOLA PUESTA
    const {  nombre_sala, capacidad, ubicacion, precio } = req.body;

    let imagen;
    if (req.file) {
      imagen = `/uploads/${req.file.filename}`;
    }

    const query = imagen
      ? "UPDATE Salas SET nombre_sala = ?, capacidad = ?, ubicacion = ?, precio=?, imagen = ? WHERE id_sala = ?"
      : "UPDATE Salas SET nombre_sala = ?, capacidad = ?, ubicacion= ? , precio = ? WHERE id_sala = ?";

    const values = imagen
      ? [nombre_sala, capacidad, ubicacion, precio, imagen, id]
      : [nombre_sala, capacidad, ubicacion, precio, id];

    const [result] = await conmysql.query(query, values);

    if (result.affectedRows <= 0) return res.status(404).json({ message: "sala no encontrada" });

    const [rows] = await conmysql.query("SELECT * FROM Salas WHERE id_sala = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en putInventario:", error);
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}

export const patchSala= 
async (req, res) => {
  try {
    const {id} = req.params;
    const { nombre_sala, capacidad, ubicacion, precio } = req.body;

    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

      const [result]=await conmysql.query("UPDATE Salas SET nombre_sala = IFNULL(?, nombre_sala), capacidad = IFNULL(?, capacidad), ubicacion = IFNULL(?, ubicacion), precio= IFNULL(?, precio), imagen = IFNULL(?, imagen) WHERE id_sala = ?",
      [nombre_sala, capacidad, ubicacion, precio, imagen, id]);

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Sala no encontrada" });

    const [rows] = await conmysql.query("SELECT * FROM Salas WHERE id_sala = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en patchSala:", error);
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}

// Eliminar una sala
export const deleteSala =
 async (req, res) => {
  try {
    const [rows] = await conmysql.query("DELETE FROM Salas WHERE id_sala = ?", [req.params.id]);
    if (rows.affectedRows <= 0) return res.status(404).json({ message: "No se pudo eliminar la sala" });
    res.sendStatus(202);
  } catch (error) {
    console.error("Error en deleteSala:", error);
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}
