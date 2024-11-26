import { Router } from "express";
import {getAlquileres, getAlquilerxid, postAlquiler, putAlquiler, patchAlquiler, deleteAlquiler } from '../controladores/alquileresCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';

const router=Router()
//armar nuestras rutas

router.get('/alquileres',verifyToken,getAlquileres)//select 
router.get('/alquileres/:id',verifyToken, getAlquilerxid)//select con id
router.post('/alquileres',verifyToken, postAlquiler)//insert
router.put('/alquileres/:id',verifyToken,putAlquiler) //update
router.patch('/alquileres/:id',verifyToken,patchAlquiler) //update
router.delete('/alquileres/:id',verifyToken,deleteAlquiler)

export default router