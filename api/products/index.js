import { connectToDatabase } from "../../connection.js";
import { CreateID } from "../../functions.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("Productos");
      const productos = await productsCollection.find({}).toArray();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === "POST") {
    try {
      const db = await connectToDatabase();
      const productsCollection = db.collection("Productos");
      const nuevoId = await CreateID(productsCollection);
      const nuevoProducto = {
        _id: nuevoId,
        ...req.body,
      };
      const result = await productsCollection.insertOne(nuevoProducto);
      res.status(201).json({ message: "Producto creado exitosamente", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}