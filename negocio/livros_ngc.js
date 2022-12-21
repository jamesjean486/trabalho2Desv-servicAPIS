const {validarLivro} = require('./livro_validacao')
const livrosPersistence = require('../persistence/livros_persistence')

async function inserir(livros) {
    if(livros && livros.nome && livros.genero && livros.id_autor){
        const livroInserido = await livrosPersistence.inserir(livros);
        return livroInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await livrosPersistence.listar();
}

async function buscarPorId(id_livro) {
    const livros = await livrosPersistence.buscarPorId(id_livro);
    if(!livros) {
        throw { id: 404, mensagem: `Livro ${id_livro} nao encontrado`};
    }
    return livros;
}

async function buscarPorNome(nome) {
    if(!nome) {
        throw { id: 400, mensagem: "Falta parametro nome"};
    }
    return await livrosPersistence.buscarPorNome(nome);
}

async function atualizar(id_livro, livros) {
    if(validarLivro(livros)) {
        const livrosAtualizar = await buscarPorId(id_livro);
        if(livrosAtualizar)
            return await livrosPersistence.atualizar(id_livro, livros);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id_livro) {
    const livroDeletar = await buscarPorId(id_livro);
    if(livroDeletar)
        return await livrosPersistence.deletar(id_livro);
    else {
        throw { id: 400, mensagem: "Livro não encontrado"};
    }
}

module.exports = {
    inserir, listar, buscarPorId, buscarPorNome, atualizar, deletar
}