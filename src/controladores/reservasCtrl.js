import { conmysql } from "../db.js";

//todas las reservas
export const getReservas= 
async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM Reservas');
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
}

// Obtener una reserva por ID
export const getReservaxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from Reservas where id_reserva=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            id_reserva:0,
            message:"Reserva no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}


// Crear una nueva reserva
export const postReserva= 
async (req, res) => {
  const { id_cliente, id_usuario, id_sala, fecha_reserva, fecha_evento, duracion, precio_total, estado } = req.body;
  try {
    const [result] = await conmysql.query(
      'INSERT INTO Reservas (id_cliente, id_usuario, id_sala, fecha_reserva, fecha_evento, duracion, precio_total, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id_cliente, id_usuario, id_sala, fecha_reserva, fecha_evento, duracion, precio_total, estado]
    );
    res.status(201).json({ message: 'Reserva creada', id_reserva: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
}

// Actualizar una reserva
export const putReserva = 
async (req, res) => {
  const {id} = req.params;
  const { id_cliente, id_usuario, id_sala, fecha_reserva, fecha_evento, duracion, precio_total, estado } = req.body;
  try {
    const [result] = await conmysql.query(
      'UPDATE Reservas SET id_cliente = ?, id_usuario = ?, id_sala = ?, fecha_reserva = ?, fecha_evento = ?, duracion = ?, precio_total = ?, estado = ? WHERE id_reserva = ?',
      [id_cliente, id_usuario, id_sala, fecha_reserva, fecha_evento, duracion, precio_total, estado, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva actualizada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reserva', error });
  }
}

export const patchReserva = 
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {id_cliente, id_usuario, id_sala, fecha_reserva, fecha_evento, duracion, precio_total, estado}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update Reservas set id_cliente = IFNULL(?, id_cliente), id_usuario = IFNULL(?, id_usuario), id_sala = IFNULL(?, id_sala), fecha_reserva = IFNULL(?, fecha_reserva), fecha_evento = IFNULL(?, fecha_evento), duracion = IFNULL(?, duracion), precio_total = IFNULL(?, precio_total), estado = IFNULL(?, estado)  where id_reserva =?',
            [id_cliente, id_usuario, id_sala, fecha_reserva, fecha_evento, duracion, precio_total, estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Reserva no encontrado'
        })
        const[rows]=await conmysql.query('select * from Reservas where id_reserva=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

// Eliminar una reserva
export const deleteReserva =
 async (req, res) => {
  const {id} = req.params;
  try {
    const [result] = await conmysql.query('DELETE FROM Reservas WHERE id_reserva = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ 
        id:0,
        message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
}
