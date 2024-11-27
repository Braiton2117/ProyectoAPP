import { Router } from "express";
import {getReservas, getReservaxid, postReserva, putReserva, patchReserva, deleteReserva } from '../controladores/reservasCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';
const router=Router()
//armar nuestras rutas

router.get('/reservas',getReservas)//select 
router.get('/reservas/:id', getReservaxid)//select con id
router.post('/reservas', postReserva)//insert
router.put('/reservas/:id',putReserva) //update
router.patch('/reservas/:id',patchReserva)  //update
router.delete('/reservas/:id',deleteReserva)

export default router
