import express from "express"
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import UsuariosRoutes from './routes/usuarios.routes.js'
import SalasRoutes from './routes/salas.routes.js'
import ReservasRoutes from './routes/reservas.routes.js'
import EventosRoutes from './routes/eventos.routes.js'
import ClientesRoutes from './routes/clientes.routes.js'
import AlquileresRoutes from './routes/alquileres.routes.js'
import InventarioRoutes from './routes/inventario.routes.js'


//import { authenticateToken } from "./auth/auth.middleware.js"

//definir modulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();
const corsOptions={
    origin:'*',//la direccion ip/dominio del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}

app.set('json spaces', 2);
app.use(cors(corsOptions))
app.use(express.json()); //para que interprete los objetos json
app.use(express.urlencoded({extended:true}));  //se añade para poder receptar formularios
app.use('/uploads',express.static(path.resolve(__dirname,'../uploads')));
//rutas

//Nuestras rutas protegidas
app.use('/api', UsuariosRoutes)
app.use('/api', SalasRoutes)
app.use('/api', EventosRoutes)
app.use('/api', ClientesRoutes)
app.use('/api', AlquileresRoutes)
app.use('/api', InventarioRoutes)
app.use('/api', ReservasRoutes)


app.use((req, res, next)=>{
    res.status(400).json({
        message:'Pagina no encontrada'
    })
})
export default app;
