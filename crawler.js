const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');
const { accessSync } = require('fs-extra');
const writeStream = fs.createWriteStream('titulos.txt');

async function init() {
    let paginas = ['https://es.wikipedia.org/wiki/Panthera_leo']
    for(i=0;i<4;i++){
    try {
        const $ = await request({
            uri: paginas[i],
            transform: body => cheerio.load(body)
        });

        const websiteTitle = $('title').html();
        console.log('Title: ', websiteTitle);

        const webSiteHeading = $('h1').text().trim();
        console.log('Heading: ', webSiteHeading);
        
        const texto = $('.mw-parser-output').find('p').text();
        
        $('.mw-parser-output').find('p').each(function() {
            $(this).find('a').each(function() {
                let enlace ='https://es.wikipedia.org' +  $(this).attr('href');
                paginas.push(enlace);
            })
        })
        console.log(paginas);

        writeStream.write(`${websiteTitle},${webSiteHeading}\n ${texto}\n`);
        


        //const third_quote = $('.quote').next().next();
        // console.log(third_quote.html())

        // Parent
        //const containerClass = $('.row.header-box');
        // console.log(containerClass.parent().html())

        // $('.quote span.text').each((i, el) => {
        //     const quote_text = $(el).text();
        //     const quote = quote_text.replace(/(^\“|\”$)/g, "");
        // })        
/*
        writeStream.write('Quote|Author|Tags\n');
        const tags = [];
        $('.quote').each((i, el) => {
            const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g, "");
            const author = $(el).find('span small.author').text();
            const tag = $(el).find('.tags a').html();
            tags.push(tag);
            // console.log(text, author, tags.join(','))
            writeStream.write(`${text}|${author}|${tags}\n`);
            // console.log(i, text, author)
        })
*/
        //console.log('Done.');
        // $('.quote .tags a').each((i, el) => {
        //     // console.log($(el).html())
        //     const text = $(el).text();
        //     const link = $(el).attr('href');
        //     console.log(text, link)
        // });

    } catch (e) {
        console.log(e);
    }
}
}




init();
