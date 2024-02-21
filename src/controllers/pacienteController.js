const Paciente = require('../models/pacienteModel');

//lsitar todos os pacientes
exports.listarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//visualizar paciente especifico
exports.pacientePorId = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (paciente === null) {
            return res.status(404).json({ message: "Paciente não encontrado" });
        }
        res.json(paciente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//criar novo paciente
exports.criarPaciente = async (req, res) => {
    const { cpf } = req.body;

    try {
        //verificar a existencia por cpf
        const pacienteExistente = await Paciente.findOne({ cpf });
        if (pacienteExistente) {
            return res.status(400).json({ message: 'CPF já cadastrado' });
        }

        const paciente = new Paciente(req.body);
        const novoPaciente = await paciente.save();
        res.status(201).json(novoPaciente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//atualizar paciente
exports.atualizarPaciente = async (req, res) => {
    try {
        const pacienteAtualizado = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Paciente atualizado com sucesso", pacienteAtualizado });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//deletar paciente
exports.deletarPaciente = async (req, res) => {
    const id = req.params.id;
    try {
        await Paciente.findByIdAndDelete(req.params.id);
        res.json({ message: `Paciente de id ${id} deletado com sucesso!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
