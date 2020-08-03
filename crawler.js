const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');
const { accessSync } = require('fs-extra');
const writeStream = fs.createWriteStream('titulos.txt');

async function init() {
    let paginas = ['https://www.ticportal.es/glosario-tic/base-datos-database']
    for(i=0;i<1;i++){
    try {
        const $ = await request({
            uri: paginas[i],
            transform: body => cheerio.load(body)
        });

        writeStream.write(`Titulo\n`);
        const websiteTitle = $('title').html().trim();
        writeStream.write(`${websiteTitle}\n`);

        writeStream.write(`h1\n`);
        $('h1').each(function(){
            const h1 = $(this).text().trim();
            writeStream.write(`${h1}\n`);
        })

        writeStream.write(`h2\n`);
        $('h2').each(function(){
            const h2 = $(this).text().trim();
            writeStream.write(`${h2}\n`);
        })

        writeStream.write(`h3\n`);
        $('h3').each(function(){
            const h3 = $(this).text().trim();
            writeStream.write(`${h3}\n`);
        })

        writeStream.write(`p\n`);
        $('p').each(function(){
            const p = $(this).text();
            writeStream.write(`${p}\n`);
        })
        
        writeStream.write(`href\n`);
        $('p').each(function() {
            $(this).find('a').each(function() {
                let enlace =$(this).attr('href');
                writeStream.write(`${enlace}\n`);
                paginas.push(enlace);
            })
        })

    } catch (e) {
        console.log(e);
    }
}
}




init();
