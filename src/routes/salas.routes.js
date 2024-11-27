import { Router } from "express";
import multer from "multer";
import {getSalas, getSalaxid, postSala, putSala, patchSala, deleteSala } from '../controladores/salasCtrl.js'
import { verifyToken } from '../jwt/verifyToken.js'

//configurar multer para almacenar las imagenes
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads'); //carpeta donde se guardan las imagenes
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload=multer({storage});

const router=Router()
//armar nuestras rutas

router.get('/salas',getSalas)//select 
router.get('/salas/:id', getSalaxid)//select con id
router.post('/salas', upload.single('image'),postSala)//insert
router.put('/salas/:id', upload.single('image'),putSala) //update
router.patch('/salas/:id', upload.single('image'),patchSala)  //update
router.delete('/salas/:id',deleteSala)

export default router
