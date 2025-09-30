import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cafezinho", 
  database: "fishon"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

// Configuração do multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/"); // pasta onde os arquivos serão salvos
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage: storage });


//ROTAS ABAIXO

// Rota de cadastro de pescador
app.post("/pescadores", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const sql = "INSERT INTO pescadores (nome, email, senha) VALUES (?, ?, ?)";
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar:", err);
      return res.status(500).json({ erro: "Erro no servidor." });
    }
    res.json({ mensagem: "Pescador cadastrado com sucesso!", id: result.insertId });
  });
});

// Rota de cadastro de pesqueiro
app.post("/pesqueiros", upload.single("alvara"), (req, res) => {
  const { nome, email, cnpj, endereco, telefone, senha } = req.body;
  const alvara = req.file ? req.file.filename : null;

  if (!nome || !email || !cnpj || !endereco || !telefone || !senha || !alvara) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const sql = `INSERT INTO pesqueiros 
    (nome, email, cnpj, endereco, telefone, alvara, senha)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nome, email, cnpj, endereco, telefone, alvara, senha], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar pesqueiro:", err);
      return res.status(500).json({ erro: "Erro no servidor." });
    }
    res.json({ mensagem: "Pesqueiro cadastrado com sucesso!", id: result.insertId });
  });
});

//Acessar os arquivos do alvará
app.use("/uploads", express.static("uploads"));

// Rota de Login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  // Verificar login em pescadores
  const sqlPescador = "SELECT * FROM pescadores WHERE email = ? AND senha = ?";
  db.query(sqlPescador, [email, senha], (err, rowsPescador) => {
    if (err) {
      console.error("Erro ao logar pescador:", err);
      return res.status(500).json({ erro: "Erro no servidor." });
    }

    if (rowsPescador.length > 0) {
      return res.json({ mensagem: "Login realizado com sucesso!", tipo: "pescador" });
    }

    // Se não achar pescador, verifica pesqueiro
    const sqlPesqueiro = "SELECT * FROM pesqueiros WHERE email = ? AND senha = ?";
    db.query(sqlPesqueiro, [email, senha], (err, rowsPesqueiro) => {
      if (err) {
        console.error("Erro ao logar pesqueiro:", err);
        return res.status(500).json({ erro: "Erro no servidor." });
      }

      if (rowsPesqueiro.length > 0) {
        return res.json({ mensagem: "Login realizado com sucesso!", tipo: "pesqueiro" });
      }

      // Nenhum usuário encontrado
      return res.status(401).json({ erro: "E-mail ou senha inválidos!" });
    });
  });
});




app.listen(port, () => {
  console.log(`🌐 Servidor rodando em http://localhost:${port}`);
});


// Rota para listar todos os pesqueiros
app.get("/pesqueiros", (req, res) => {
  const sql = "SELECT id, nome, endereco, telefone FROM pesqueiros";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar pesqueiros:", err);
      return res.status(500).json({ erro: "Erro ao buscar pesqueiros." });
    }
    res.json(results);
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> a494a0f (login funcionando)
