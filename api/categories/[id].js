import { connectToDatabase } from "../../connection.js";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const db = await connectToDatabase();
      const categoriesCollection = db.collection("Categorias");
      const result = await categoriesCollection.deleteOne({ _id: Number(id) });

      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Categoría eliminada" });
      } else {
        res.status(404).json({ error: "Categoría no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === "PATCH") {
    try {
      const db = await connectToDatabase();
      const categoriesCollection = db.collection("Categorias");
      const result = await categoriesCollection.updateOne({ _id: Number(id) }, { $set: req.body });

      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Categoría actualizada" });
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