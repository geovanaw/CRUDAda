const pacienteController = require('../controllers/pacienteController');
const usuarioController = require('../controllers/usuarioController');

module.exports = router => {
    // listar todos os usuários
    router.get('/pacientes',usuarioController.autenticacao, pacienteController.listarPacientes);

    // visualizar usuário por id
    router.get('/pacientes/:id', usuarioController.autenticacao, pacienteController.pacientePorId);

    // criar usuário
    router.post('/pacientes', usuarioController.autenticacao, pacienteController.criarPaciente);

    // atualizar usuário
    router.put('/pacientes/:id', usuarioController.autenticacao, pacienteController.atualizarPaciente);

    // deletar usuário
    router.delete('/pacientes/:id', usuarioController.autenticacao, pacienteController.deletarPaciente);

}
