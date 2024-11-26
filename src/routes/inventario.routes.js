import { Router } from "express";
import multer from "multer";
import {getInventarios, getInventarioxid, postInventario, putInventario, patchInventario, deleteInventario } from '../controladores/inventarioCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js';
const router=Router()
//armar nuestras rutas
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads'); //carpeta donde se guardan las imagenes
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload=multer({storage});

router.get('/inventario',verifyToken,getInventarios)//select 
router.get('/inventario/:id',verifyToken, getInventarioxid)//select con id
router.post('/inventario',verifyToken, upload.single('imagen'),postInventario)//insert
router.put('/inventario/:id',verifyToken, upload.single('image'),putInventario) //update
router.patch('/inventario/:id',verifyToken,upload.single('image'),patchInventario)  //update
router.delete('/inventario/:id',verifyToken, deleteInventario)

export default router