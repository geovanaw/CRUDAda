const usuarioController = require('../controllers/usuarioController');

module.exports = router => {
    // listar todos os usuários
    router.get('/usuarios', usuarioController.listarUsuarios);

    // visualizar usuário por id
   router.get('/usuario/:id', usuarioController.autenticacao, usuarioController.usuarioPorId);

    // criar usuário
    router.post('/usuario', usuarioController.criarUsuario);

    // login de usuario
    router.post('/login', usuarioController.validarUsuario);

    // atualizar usuário
    router.put('/usuario/:id', usuarioController.autenticacao, usuarioController.atualizarUsuario);

    // deletar usuário
    router.delete('/usuario/:id', usuarioController.autenticacao, usuarioController.deletarUsuario);

}