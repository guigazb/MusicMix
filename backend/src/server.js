import express from 'express';
import cors from 'cors';
import artistsRoutes from './Routes/artistsRoutes.js'; // 'Routes' com maiúscula

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/artists', artistsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MusicMix API rodando!', endpoints: ['/api/artists'] });
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/api/artists`);
});