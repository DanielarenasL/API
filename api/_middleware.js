import Cors from 'cors';

// Inicializa el middleware de CORS
const cors = Cors({
  origin: 'https://danielarenasl.github.io', // Permitir todos los orígenes (o especifica uno en particular)
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
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
  // Ejecuta el middleware de CORS
  await runMiddleware(req, res, cors);

  // Maneja solicitudes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Continúa con el siguiente manejador si no es OPTIONS
}