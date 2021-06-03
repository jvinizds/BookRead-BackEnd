const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Livro = require('../model/Livros')

/*****************************
 * GET /livros/
 * Listar todos os livros
 ****************************/

router.get("/", async(req, res) => {
    try{
        const livros = await Livro.find()
        res.json(livros)
    }catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter os livros'}]
        })
    }
})

/*****************************
 * GET /livros/:id
 * Lista livro por id
 ****************************/
 router.get('/:id', async(req, res)=>{
    try{
       const livro = await Livro.findById(req.params.id)
       res.json(livro)
    } catch (err){
      res.status(500).send({
       errors: [{message: `Não foi possível obter a livro com o id ${req.params.id}`}]
      })
    }
})

/*****************************
 * POST /livros/
 * Inclui livro
 ****************************/
 const validaLivro = [
    check('nome','Nome do livro é obrigatório').not().isEmpty(),
    check('autor','Nome do autor é obrigatório').not().isEmpty(),
]

router.post('/', validaLivro,
  async(req, res)=> {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({
              errors: errors.array()
          })
      }
      const { nome } = req.body
      let livro = await Livro.findOne({nome})
      if(livro)
        return res.status(200).json({errors:[{message:'Já existe uma livro com o nome informado!'}]})
     try{
         let livro = new Livro(req.body)
         await livro.save()
         res.send(livro)
     } catch (err){
         return res.status(500).json({
             errors: [{message: `Erro ao salvar o livro: ${err.message}`}]
         })
     }      
  })

/*****************************
 * DELETE /livros/:id
 * Apaga livro por id
 ****************************/
router.delete("/:id", async(req, res) => {
    await Livro.findByIdAndRemove(req.params.id)
    .then(livro => {res.send(
        {message: `Livro ${livro.nome} removida com sucesso`}
        )
    }).catch(err => {
        return res.status(500).send(
            {errors: 
            [{message: `Não foi possível apagar livro com o id ${req.params.id}`}]
            })
    })
})

/*******************************************
 * PUT /livros
 * Altera os dados da livro informada
 *******************************************/
router.put('/', validaLivro,
async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Livro.findByIdAndUpdate(req.body._id, {
        $set: dados
    },{new: true})
    .then(livro => {
        res.send({message: `Livro ${livro.nome} alterado com sucesso!`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{
        message:`Não foi possível alterar o livro com o id ${req.body._id}`}]
        })
    })
})

module.exports = router