import Cors from 'cors';

// Inicializa el middleware de CORS
const cors = Cors({
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  origin: '*' // Permitir solicitudes desde cualquier origen
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

export default async function handler(req, res, next) {
  // Ejecuta el middleware de CORS antes de manejar la solicitud
  await runMiddleware(req, res, cors);
  next();
}