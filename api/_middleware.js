import Cors from 'cors';

const cors = Cors({
  origin: ['http://127.0.0.1:5501', 'https://danielarenasl.github.io/JavaScript/'], // Permite orígenes específicos
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras personalizadas
});

// Función para usar el middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Manejar solicitudes preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
    return;
  }

  // Ejecuta el middleware de CORS
  await runMiddleware(req, res, cors);

  // Aquí continúa la lógica de tu API...
  res.status(200).json({ message: 'Solicitud exitosa' });
}