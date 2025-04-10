import { connectToDatabase } from "../../connection.js";

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const productsCollection = db.collection("Productos");
    const id = Number(req.query.id);

    if (req.method === "DELETE") {
        // Borrar producto
        try {
            const result = await productsCollection.deleteOne({ _id: id });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Producto eliminado" });
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } else if (req.method === "PATCH") {
        // Editar producto
        try {
            const ToUpdate = req.body;
            const result = await productsCollection.updateOne({ _id: id }, { $set: ToUpdate });
            if (result.matchedCount > 0) {
                res.status(200).json({ message: "Producto editado" });
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}