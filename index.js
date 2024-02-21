const express = require('express');
const connectDB = require('./src/config/db');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados MongoDB
connectDB();
require("./src/routes/pacienteRoutes")(app);
require("./src/routes/usuarioRoutes")(app);

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
    console.log("As rotas destinadas aos pacientes conseguem ser acessadas apenas após o login de um usuário autenticado por token jwt. Então, é necessário fazer o cadastro de usuário e posterior login.");
});