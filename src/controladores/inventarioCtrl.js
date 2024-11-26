import { conmysql } from "../db.js";

//todas las inventario
export const getInventarios= 
async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM Inventario");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener inventarios:", error);
    res.status(500).json({ message: "Error al obtener inventarios" });
  }
}

//sala por su ID
export const getInventarioxid= 
async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM Inventario WHERE id_item = ?", [req.params.id]);
    if (result.length <= 0)
      return res.status(404).json({
        id_item:0,
        message: "Inventario no encontrada",
      })
      res.json(result[0])
  } catch (error) {
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}
export const postInventario = 
async (req, res) => {
  try {
    const { nombre_item, tipo, cantidad_disponible, precio } = req.body;
    let imagen = null;
    if (req.file) {
      imagen = `/uploads/${req.file.filename}`; // Ruta del archivo subido
    }

    const [rows] = await conmysql.query(
      "INSERT INTO Inventario (nombre_item, cantidad_disponible, precio, imagen) VALUES (?, ?, ?, ?)",
      [nombre_item, tipo, cantidad_disponible, precio, imagen]
    );

    res.status(201).json({
      message: "Inventario creada correctamente",
      id_item: rows.insertId,
      imagen: imagen,
    });
  } catch (error) {
    console.error("Error en postInventario:", error);
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}
export const putInventario = 
async (req, res) => {
  try {
    const {id} = req.params;
    console.log("ID del producto a actualizar:", id);  //CONSOLA PUESTA
    console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);   //CONSOLA PUESTA
    console.log("Archivo de imagen recibido:", req.file);   //CONSOLA PUESTA
    const { nombre_item, cantidad_disponible, precio } = req.body;

    let imagen;
    if (req.file) {
      imagen = `/uploads/${req.file.filename}`;
    }

    const query = imagen
      ? "UPDATE Inventario SET nombre_item = ?, cantidad_disponible = ?, precio = ?, imagen = ? WHERE id_item = ?"
      : "UPDATE Inventario SET nombre_item = ?, cantidad_disponible = ?, precio = ? WHERE id_item = ?";

    const values = imagen
      ? [nombre_item, cantidad_disponible, precio, imagen, id]
      : [nombre_item, cantidad_disponible, precio, id];

    const [result] = await conmysql.query(query, values);

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Inventario no encontrada" });

    const [rows] = await conmysql.query("SELECT * FROM Inventario WHERE id_item = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en putInventario:", error);
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}

export const patchInventario= 
async (req, res) => {
  try {
    const {id} = req.params;
    const { nombre_item, cantidad_disponible, precio } = req.body;

    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await conmysql.query(
      "UPDATE Inventario SET nombre_item = IFNULL(?, nombre_item), cantidad_disponible = IFNULL(?, cantidad_disponible), precio= IFNULL(?, precio), imagen = IFNULL(?, imagen) WHERE id_item = ?",
      [nombre_item, cantidad_disponible, precio, imagen, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Inventario no encontrada" });

    const [rows] = await conmysql.query("SELECT * FROM Inventario WHERE id_item = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en patchInventario:", error);
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
}

// Eliminar una sala
export const deleteInventario=
async(req, res)=>{
    try {
        console.log("ID recibido para eliminación:", req.params.id);  //CONSOLA PUESTA
        const [rows]=await conmysql.query('delete from Inventario where id_item=?',[req.params.id])
        console.log("Resultado de la consulta:", rows);   //CONSOLA PUESTA
        if (rows.affectedRows <= 0) {
            console.log("No se encontró el inventario para eliminar.");  //CONSOLA PUESTA
            return res.status(404).json({
                id: 0,
                message: "No pudo eliminar el inventario"
            });
        }
        console.log("Inventario eliminado con éxito.");   //CONSOLA PUESTA
        //res.sendStatus(202)
        res.status(202).json({ message: "Inventario eliminado" });
    } catch (error) {
        console.error("Error en el servidor:", error);   //CONSOLA PUESTA
        return res.status(500).json({
            message:error
        
        })
    }
}