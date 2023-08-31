const cherio = require('cherio')
const express = require('express')



fetch('https://books.toscrape.com/')
    .then( response => response.text())
    .then( body => {
        const $ = cherio.load(body)
        const categorias = []
        $('.nav-list li li a').each(function () {
            const text = $(this).text()
            const href = $(this).atr('href')
            categorias.push({text, href})
        })

        console.log(categorias)
    })