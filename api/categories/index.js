import { connectToDatabase } from "../../connection.js";
import { CreateID } from "../../functions.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const categoriesCollection = db.collection("Categorias");
      const categorias = await categoriesCollection.find({}).toArray();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === "POST") {
    try {
      const db = await connectToDatabase();
      const categoriesCollection = db.collection("Categorias");
      const nuevoId = await CreateID(categoriesCollection);
      const nuevaCategoria = {
        _id: nuevoId,
        ...req.body,
      };
      const result = await categoriesCollection.insertOne(nuevaCategoria);
      res.status(201).json({ message: "Categoría creada exitosamente", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}