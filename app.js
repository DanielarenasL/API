import express from "express";
import dotenv from 'dotenv';
import { connectToDatabase } from "./connection.js";
import { CreateID } from "./functions.js";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT) || 3000;

app.use(express.json());

//Listar productos

app.get('/products', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const productsCollection = db.collection('Productos');
        const productos = await productsCollection.find({}).toArray();
        res.json({ data: productos });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });  
    }
});

//Listar categorias
app.get('/categories', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const categoriesCollection = db.collection('Categorias');
        const categorias = await categoriesCollection.find({}).toArray();
        res.json({ data: categorias});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor'});   
    }
});

//Crear productos
app.post('/products', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const productsCollection = db.collection('Productos');
        const nuevoId = await CreateID(productsCollection);
        const nuevoProducto = {
            _id: nuevoId,
            nombre: req.body.nombre,
            precio: req.body.precio,
            talla: req.body.talla,
            color: req.body.color,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            stock: req.body.stock || 0,
        };
        const result = await productsCollection.insertOne(nuevoProducto);

        res.status(201).json({ message: "Producto creado exitosamente", data: result });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' }); 
    }
});

//Crear categorias
app.post('/categories/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const categoriesCollection = db.collection('Categorias');
        const nuevoId = await CreateID(categoriesCollection);
        const nuevaCategoria = {
            _id: nuevoId,
            nombre: req.body.nombre
        };
        const result = await categoriesCollection.insertOne(nuevaCategoria);

        res.status(201).json( {message: "Categoria creada ", data: result});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' }); 
    }
});

//Borrar productos
app.delete('/products/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const productsCollection = db.collection('Productos');
        const id = Number(req.params.id);
        const result = await productsCollection.deleteOne({"_id": id});

        const comprobacion = await productsCollection.find({"_id": id})
        if(comprobacion){
            res.status(201).json( {message: "Producto eliminado ", data: result});
            console.log('eliminado');
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' }); 
    }
});

//borrar categorias 
app.delete('/categories/:id', async(req,res) => {
    try{
        const db = await connectToDatabase();
        const categoriesCollection = db.collection('Categorias');
        const id = Number(req.params.id);
        const result = await categoriesCollection.deleteOne({"_id": id});

        if (result){
            res.status(200).json({message: "Categoria eliminada"});
        } else {
            res.status(404).json({ error: "Categoría no encontrada" });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Update Products
app.patch('/products/:id', async (req, res) => {
    try {

        const db = await connectToDatabase();
        const productsCollection = db.collection('Productos');
        const id = Number(req.params.id);
        const ToUpdate = req.body;
        const result = await productsCollection.updateOne({"_id": id}, { $set: ToUpdate});

        res.status(201).json( {message: "Producto editado ", data: result});

    }catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' }); 
    }
})

// Añadir editar categorias
app.patch('/categories/:id', async(req,res) => {
    try{
        const db = await connectToDatabase();
        const categoriesCollection = db.collection('Categorias');
        const id = Number(req.params.id);
        const ToUpdate = req.body;

        const result = await categoriesCollection.updateOne(
            {"_id":id},
            { $set: ToUpdate}
        );
        
        if (result){
            res.status(200).json({message: "Categoria editada"});
        } else {
            res.status(404).json({ error: "Categoría no encontrada" });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});