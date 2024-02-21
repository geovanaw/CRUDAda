const Usuario = require('../models/usuarioModel');
const crypto = require("crypto");   
const jwt = require("jsonwebtoken");
const secretKey = "secret_key";

const senhaHash = (senha) => {
    return crypto.createHash("sha256").update(senha).digest("hex");
};

exports.criarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
    
        // pega o hash da senha
        const senhaCripto = senhaHash(senha);

        const novoUsuario = new Usuario({ email, senha: senhaCripto });
        await novoUsuario.save();
        
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.validarUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const senhaCripto = senhaHash(senha);

    try {
        const usuarioAutenticado = await Usuario.findOne({ email, senha: senhaCripto });

        if (usuarioAutenticado) {
            const expiresIn = "10000";
            const token = jwt.sign({
                id: usuarioAutenticado._id, // id de usuario pra gerar o token
                email: usuarioAutenticado.email
            }, secretKey);
            res.send({
                type: "Bearer",
                token,
                expiresIn,
            });
        } else {
            res.status(401).send("Usuário ou senha incorretos.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao autenticar usuário.");
    }
};

exports.autenticacao = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    console.log("Token:", bearerToken);
    
    if (!bearerToken) {
        return res.status(401).send("Token não fornecido");
    }

    const token = bearerToken.split(" ")[1]; // extraçao do token

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const usuario = await Usuario.findById(decodedToken.id);

        if (!usuario) {
            res.status(401).send("Token inválido");
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(401).send("Token inválido");
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.usuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario === null) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { senha, email } = req.body;

    try {
        if (!senha && !email) {
            return res.status(400).json({ message: 'Pelo menos uma nova senha ou novo e-mail é obrigatório.' });
        }

        const update = {};

        if (senha) {
            const senhaCriptografada = crypto.createHash("sha256").update(senha).digest("hex");
            update.senha = senhaCriptografada;
        }

        if (email) {
            update.email = email;
        }

        //atualizar no bd
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, update, { new: true });

        res.json(usuarioAtualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deletarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};