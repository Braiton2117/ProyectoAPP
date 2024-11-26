import { Router } from "express";
import {getReservas, getReservaxid, postReserva, putReserva, patchReserva, deleteReserva } from '../controladores/reservasCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';
const router=Router()
//armar nuestras rutas

router.get('/reservas',verifyToken,getReservas)//select 
router.get('/reservas/:id',verifyToken, getReservaxid)//select con id
router.post('/reservas',verifyToken, postReserva)//insert
router.put('/reservas/:id',verifyToken,putReserva) //update
router.patch('/reservas/:id',verifyToken,patchReserva)  //update
router.delete('/reservas/:id',verifyToken,deleteReserva)

export default router