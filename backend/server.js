const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const crypto = require('crypto');
const sequelize = require('./database');
const Game = require('./models/Game');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'admin123';
let activeAuthToken = null;

// Configuração do Multer para upload de arquivos em memória
const upload = multer({ storage: multer.memoryStorage() });

// Sync database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autenticado.' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!activeAuthToken || token !== activeAuthToken) {
    return res.status(401).json({ message: 'Token inválido.' });
  }

  next();
};

const normalizeGamePayload = (payload) => ({
  ...payload,
  year: Number(payload.year),
  playedYear: payload.playedYear ? Number(payload.playedYear) : null,
  rating: payload.rating ? Number(payload.rating) : null,
  hours: payload.hours ? Number(payload.hours) : null,
  finished: Boolean(payload.finished),
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
  }

  activeAuthToken = crypto.randomBytes(24).toString('hex');
  return res.json({
    token: activeAuthToken,
    user: { username: ADMIN_USER },
  });
});

// Routes
app.get('/api/games', requireAuth, async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

app.get('/api/games/:id(\\d+)', requireAuth, async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (game) {
    return res.json(game);
  }
  return res.status(404).send('Game not found');
});

app.post('/api/games', requireAuth, async (req, res) => {
  const game = await Game.create(normalizeGamePayload(req.body));
  res.json(game);
});

app.put('/api/games/:id', requireAuth, async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (game) {
    await game.update(normalizeGamePayload(req.body));
    res.json(game);
  } else {
    res.status(404).send('Game not found');
  }
});

app.post('/api/games/upload', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Mapeia e limpa os dados para o formato do banco de dados
    const gamesToCreate = data.map(game => ({
      ...game,
      year: parseInt(game.year, 10),
      playedYear: game.playedYear ? parseInt(game.playedYear, 10) : null,
      rating: game.rating ? parseInt(game.rating, 10) : null,
      hours: game.hours ? parseInt(game.hours, 10) : null,
      finished: String(game.finished).toLowerCase() === 'true' || String(game.finished) === '1',
    }));

    await Game.bulkCreate(gamesToCreate);
    res.status(200).send({ message: `${gamesToCreate.length} jogos importados com sucesso!` });
  } catch (error) { 
    console.error('Erro ao importar arquivo:', error);
    res.status(500).send('Erro ao processar o arquivo.');
  }
});

// Rota para baixar o template dinamicamente
app.get('/api/games/template', requireAuth, (req, res) => {
  try {
    const headers = [['year', 'name', 'genre', 'platform', 'rating', 'hours', 'finished', 'playedYear']];
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet(headers);

    // Adiciona um exemplo
    xlsx.utils.sheet_add_aoa(worksheet, [
      [2023, 'The Legend of Zelda: Tears of the Kingdom', 'Aventura', 'Switch', 10, 150, true, 2024]
    ], { origin: 'A2' });

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Jogos');

    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=template.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error('Erro ao gerar o template:', error);
    res.status(500).send('Não foi possível gerar o arquivo modelo.');
  }
});

app.delete('/api/games/:id', requireAuth, async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (game) {
    await game.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Game not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
