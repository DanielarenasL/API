import { connectToDatabase } from "../connection.js";
import { CreateID } from "../functions.js";

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const categoriesCollection = db.collection('Categorias');

    if (req.method === 'GET') {
        // Listar categorías
        try {
            const categorias = await categoriesCollection.find({}).toArray();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else if (req.method === 'POST') {
        // Crear una nueva categoría
        try {
            const nuevoId = await CreateID(categoriesCollection);
            const nuevaCategoria = {
                _id: nuevoId,
                name: req.body.name,
                description: req.body.description,
                image: req.body.image
            };
            const result = await categoriesCollection.insertOne(nuevaCategoria);
            res.status(201).json({ message: "Categoría creada exitosamente", data: result });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else if (req.method === 'DELETE') {
        // Eliminar categoría
        try {
            const id = Number(req.query.id);
            const result = await categoriesCollection.deleteOne({ "_id": id });

            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Categoría eliminada" });
            } else {
                res.status(404).json({ error: "Categoría no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else if (req.method === 'PATCH') {
        // Editar categoría
        try {
            const id = Number(req.query.id);
            const ToUpdate = req.body;

            const result = await categoriesCollection.updateOne(
                { "_id": id },
                { $set: ToUpdate }
            );

            if (result.matchedCount > 0) {
                res.status(200).json({ message: "Categoría editada" });
            } else {
                res.status(404).json({ error: "Categoría no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}