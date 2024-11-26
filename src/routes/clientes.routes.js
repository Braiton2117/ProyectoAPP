import { Router } from "express";
import {getClientes, getClientexid, postCliente, putCliente, patchCliente, deleteCliente } from '../controladores/clientesCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';

const router=Router()
//armar nuestras rutas

router.get('/clientes',verifyToken,getClientes)//select 
router.get('/clientes/:id',verifyToken, getClientexid)//select con id
router.post('/clientes',verifyToken, postCliente)//insert
router.put('/clientes/:id',verifyToken,putCliente) //update
router.patch('/clientes/:id',verifyToken,patchCliente) //update
router.delete('/clientes/:id',verifyToken,deleteCliente)

export default router