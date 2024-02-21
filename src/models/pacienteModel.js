const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    idade: { type: String, required: true },
    email: { type: String, required: true },
    endereco: {
        rua: { type: String, required: true },
        numero: { type: Number, required: true },
        cidade: { type: String, required: true },
        estado: { type: String, required: true },
        cep: { type: String, required: true },
    },
    telefones: [{ type: String, required: true }],
});

module.exports = mongoose.model('Paciente', pacienteSchema);