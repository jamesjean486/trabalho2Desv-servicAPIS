function validarLivro(livros) {
    return livros && livros.nome && livros.genero && livros.id_livro && 
    typeof livros.nome == 'string' && 
    typeof livros.genero == 'string' && 
    typeof livros.id_livro == 'number' 
}

module.exports = {
    validarLivro
}