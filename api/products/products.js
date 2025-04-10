import { connectToDatabase } from "../../connection.js";
import { CreateID } from "../../functions.js";

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const productsCollection = db.collection('Productos');

    if (req.method === 'GET') {
        // Listar productos
        try {
            const productos = await productsCollection.find({}).toArray();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else if (req.method === 'POST') {
        // Crear productos
        try {
            const nuevoId = await CreateID(productsCollection);
            const nuevoProducto = {
                _id: nuevoId,
                title: req.body.title,
                value: req.body.value,
                description: req.body.description,
                category_id: req.body.category_id,
                images: req.body.images
            };
            const result = await productsCollection.insertOne(nuevoProducto);
            res.status(201).json({ message: "Producto creado exitosamente", data: result });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else if (req.method === 'DELETE') {
        // Eliminar productos
        try {
            const id = Number(req.query.id);
            const result = await productsCollection.deleteOne({ "_id": id });
            res.status(200).json({ message: "Producto eliminado", data: result });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}