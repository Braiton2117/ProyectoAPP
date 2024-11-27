import { conmysql } from "../db.js";

// Obtener todos los eventos
export const getEventos = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM Eventos');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los eventos', error });
  }
};

// Obtener un evento por ID
export const getEventoxid = async (req, res) => {
  const {id} = req.params;
  try {
    const [rows] = await conmysql.query('SELECT * FROM Eventos WHERE id_evento = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ 
        id_evento: 0,
        message: 'Evento no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el evento', error });
  }
};

// Crear un nuevo evento
export const postEvento = async (req, res) => {
  const { id_usuario, id_cliente, nombre_evento, descripcion, fecha } = req.body;
  if (!id_usuario || !id_cliente || !nombre_evento || !descripcion || !fecha) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }
  try {
    const [result] = await conmysql.query(
      'INSERT INTO Eventos (id_usuario, id_cliente, nombre_evento, descripcion, fecha) VALUES (?, ?, ?, ?, ?)',
      [id_usuario, id_cliente, nombre_evento, descripcion, fecha]
    );
    res.status(201).json({ message: 'Evento creado', id_evento: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el evento', error });
  }
}
export const putEvento = async (req, res) => {
  const {id} = req.params;
  const { id_usuario, id_cliente, nombre_evento, descripcion, fecha } = req.body;

  try {
    const [result] = await conmysql.query(
      'UPDATE Eventos SET id_usuario = ?, id_cliente = ?, nombre_evento = ?, descripcion = ?, fecha = ? WHERE id_evento = ?',
      [id_usuario, id_cliente, nombre_evento, descripcion, fecha, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.status(200).json({ message: 'Evento actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el evento', error });
  }
};

// Actualizar parcialmente un evento (PATCH)
export const patchEvento = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const [result] = await conmysql.query('UPDATE Eventos SET ? WHERE id_evento = ?', [updates, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.status(200).json({ message: 'Evento actualizado parcialmente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar parcialmente el evento', error });
  }
};

// Eliminar un evento
export const deleteEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await conmysql.query('DELETE FROM Eventos WHERE id_evento = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json({ message: 'Evento eliminado' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el evento', error });
  }
}
