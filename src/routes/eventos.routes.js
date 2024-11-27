import { Router } from "express";
import {getEventos, getEventoxid, postEvento, putEvento, patchEvento, deleteEvento } from '../controladores/eventosCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';

const router=Router()
//armar nuestras rutas

router.get('/eventos',getEventos)//select 
router.get('/eventos/:id', getEventoxid)//select con id
router.post('/eventos', postEvento)//insert
router.put('/eventos/:id',putEvento) //update
router.patch('/eventos/:id',patchEvento) //update
router.delete('/eventos/:id',deleteEvento)

export default router
