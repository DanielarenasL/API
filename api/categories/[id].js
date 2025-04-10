import { connectToDatabase } from "../../connection.js";

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const categoriesCollection = db.collection("Categorias");
    const id = Number(req.query.id);

    if (req.method === "DELETE") {
        // Eliminar categoría
        try {
            const result = await categoriesCollection.deleteOne({ _id: id });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Categoría eliminada" });
            } else {
                res.status(404).json({ error: "Categoría no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } else if (req.method === "PATCH") {
        // Editar categoría
        try {
            const ToUpdate = req.body;
            const result = await categoriesCollection.updateOne({ _id: id }, { $set: ToUpdate });
            if (result.matchedCount > 0) {
                res.status(200).json({ message: "Categoría editada" });
            } else {
                res.status(404).json({ error: "Categoría no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}