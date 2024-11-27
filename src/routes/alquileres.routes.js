import { Router } from "express";
import {getAlquileres, getAlquilerxid, postAlquiler, putAlquiler, patchAlquiler, deleteAlquiler } from '../controladores/alquileresCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';

const router=Router()
//armar nuestras rutas

router.get('/alquileres',getAlquileres)//select 
router.get('/alquileres/:id', getAlquilerxid)//select con id
router.post('/alquileres', postAlquiler)//insert
router.put('/alquileres/:id',putAlquiler) //update
router.patch('/alquileres/:id',patchAlquiler) //update
router.delete('/alquileres/:id',deleteAlquiler)

export default router
