const express = require('express');
const livrosNegocio = require('./negocio/livros_ngc');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get("/livros", async (req, res) => {
    try{
        const listaLivros = await livrosNegocio.listar();
        res.json(listaLivros);
    } catch(err){ 
        res.status(500).json({Erro:"Erro na Aplicacao"});
    }

})

app.get("/livros/:id_livro", async (req, res) => {
        const id_livro = req.params.id_livro;
       try{
        const livros = await livrosNegocio.buscarPorId(id_livro);
        res.json(livros);
        } 
        catch(err){
            if(err && err.id) {
                res.status(err.id).json({Erro: err.mensagem})
            }
            else {
                res.status(500).json({Erro:"Erro na Aplicacao"});
            }
        }
    })

app.post("/livros",async (req, res) => {
    const livros = req.body;

    try{
        const livroInserido = await livrosNegocio.inserir(livros);
        res.status(201).json(livroInserido);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }        
    }

})


app.put("/livros/:id_livro", async (req, res) => {
    const id_livro = req.params.id_livro;
    let livros = req.body;
    try{
        const livroAtualizado = await livrosNegocio.atualizar(id_livro, livros);
        res.json(livroAtualizado);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            console.log(err);
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }        
    }
})

app.delete("/livros/:id_livro", async (req, res) => {
    const id_livro = req.params.id_livro;
    try{
        const livroDeletado = await livrosNegocio.deletar(id_livro);
        res.json(livroDeletado);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }        
    }

})

app.listen(3000, () => {
    console.log ("Servidor iniciado na porta 3000");
})
