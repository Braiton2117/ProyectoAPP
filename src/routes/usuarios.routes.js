import { Router } from "express";
import {getUsuarios, getUsuarioxid, postUsuario, putUsuario, patchUsuario, deleteUsuario, login } from '../controladores/usuariosCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';
const router=Router()
//armar nuestras rutas

router.get('/usuarios',verifyToken,getUsuarios)//select 
router.get('/usuarios/:id',verifyToken,getUsuarioxid)//select con id
router.post('/usuarios', postUsuario)//insert
router.put('/usuarios/:id',putUsuario) //update
router.patch('/usuarios/:id',patchUsuario)  //update
router.delete('/usuarios/:id',deleteUsuario)
router.post('/login', login); // login

export default router