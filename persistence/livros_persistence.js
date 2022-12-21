const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const sql = 'SELECT * FROM livros';
    const res = await cliente.query(sql); 
    let listaLivros = res.rows;
    await cliente.end();
    return listaLivros;
}

async function inserir(livro) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO livros(nome,genero, id_livro,  id_autor) VALUES ($1,$2,$3, $4) RETURNING *', 
        [livro.nome, livro.genero,livro.id_livro, livro.id_autor]);
    await cliente.end();
    return res.rows[0]
}

async function buscarPorId(id_livro) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros WHERE id_livro=$1',[id_livro]);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros WHERE nome=$1',[nome]);
    await cliente.end();
    return res.rows;
}

async function atualizar(id_livro, livro) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('UPDATE livros SET nome=$1, genero=$2, id_autor=$3 WHERE id_livro=$4 RETURNING *', 
        [livro.nome, livro.genero, livro.id_autor, id_livro]);
    await cliente.end();
    return res.rows[0]
}

async function deletar(id_livro) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM livros WHERE id_livro=$1 RETURNING *',[id_livro]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listar, 
    inserir, 
    buscarPorId, 
    buscarPorNome,
    atualizar,
    deletar
}


