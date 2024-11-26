import { Router } from "express";
import {getEventos, getEventoxid, postEvento, putEvento, patchEvento, deleteEvento } from '../controladores/eventosCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';

const router=Router()
//armar nuestras rutas

router.get('/eventos',verifyToken,getEventos)//select 
router.get('/eventos/:id',verifyToken, getEventoxid)//select con id
router.post('/eventos',verifyToken, postEvento)//insert
router.put('/eventos/:id',verifyToken,putEvento) //update
router.patch('/eventos/:id',verifyToken,patchEvento) //update
router.delete('/eventos/:id',verifyToken,deleteEvento)

export default router