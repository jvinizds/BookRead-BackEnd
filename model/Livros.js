const mongoose = require('mongoose')

const LivrosSchema = mongoose.Schema({
    nome: { type: String, unique:true },
    autor: {type:String},
    ultima_pagina_lida: {type:Number},
    status: { type:String, enum: ['Concluído','Não Concluído'], default:'Não Concluído'},
    imagem: {
        url: {type:String}
    }
},{timestamps:true})

module.exports = mongoose.model('livros',LivrosSchema)