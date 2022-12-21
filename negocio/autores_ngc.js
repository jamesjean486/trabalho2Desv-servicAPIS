const autoresPersistence = require('../persistence/autores_persistence')

async function inserir(autores) {
    if(autores && autores.nome){
        const autorInserido = await autoresPersistence.inserir(autor);
        return autorInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() { 
    return await autoresPersistence.listar();
}

async function buscarPorId(id_autor) {
    const autores = await autoresPersistence.buscarPorId(id_autor);
    if(!autores) {
        throw { id: 400, mensagem: 'Autor ${id} nao encontrado'};
    }
    return autores;
}

async function atualizar(id_autor, autores){
    if(autores && autores) {
        const autoresAtualizar = await buscarPorId(id_autor);
        if(autoresAtualizar)
            return await autoresPersistence.atualizar(id_autor, autores);

    }
    else{
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id_autor) {
    const autoresDeletar = await buscarPorId(id_autor);
    if(autoresDeletar)
        return await autoresPersistence.deletar(id_autor);
}

module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar
}
