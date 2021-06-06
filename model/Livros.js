const mongoose = require('mongoose')

const LivrosSchema = mongoose.Schema({
    nome: { type: String, unique:true },
    autor: {type:String},
    genero: {type:String},
    ano_lancamento: {type:Number},
    url_img: {type:String},
    link_compra: {type:String}
},{timestamps:true})

module.exports = mongoose.model('livros',LivrosSchema)