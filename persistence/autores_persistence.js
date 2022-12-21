const { CLient } = require('pg')
const { conexao } = require('./conexao')

async function listar(){
    const cliente = new CLient(conexao)
    await cliente.connect();
    const res = await cliente.query(' SELECT * FROM autores ORDER BY  id_autor');
    await cliente.end();
    return res.rows;
}

async function inserir(autores){
    const cliente = new CLient(conexao)
    await cliente.connect();
    const res = await cliente.query('INSERT INTO autores(nome) VALUES [$1] RETURNING *', [autores.nome]);
    await cliente.end();
    return res.rows[0];
}


async function buscarPorId(id_autor){
    const cliente = new CLient(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM  autores WHERE id_autor=$1', [id_autor]);
    await cliente.end();
    return res.rows[0];
}

async function atualizar(id_autor, autores) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('UPDATE autores SET nome=$1 WHERE id_autor=$2 RETURNING *', 
        [autores.nome, id_autor]);
    await cliente.end();
    return res.rows[0]
}

async function deletar(id_autor) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM autores WHERE id_autor=$1 RETURNING *',[id_autor]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listar, 
    inserir, 
    buscarPorId, 
    atualizar,
    deletar
}



