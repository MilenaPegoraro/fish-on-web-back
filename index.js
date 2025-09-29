const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cafezinho', // substitua pela senha do root
  database: 'banco_qualquer'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL!');
});

// ===== ROTAS =====

// Listar todos os usuários
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Criar um usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, nome, email });
  });
});

// Atualizar um usuário
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  db.query('UPDATE usuarios SET nome=?, email=? WHERE id=?', [nome, email, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário atualizado!' });
  });
});

// Deletar um usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário deletado!' });
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('🌐 Servidor rodando em http://localhost:3000');
});
