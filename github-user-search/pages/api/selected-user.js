import Cors from 'cors';

// Inicializa el middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: 'http://localhost:4200', // Permite solicitudes desde este origen
});

// Función para ejecutar el middleware
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
  // Ejecuta el middleware CORS
  await runMiddleware(req, res, cors);

  // Lógica de la API
  const username = req.query.username || 'octocat';
  res.status(200).json({ username });
}