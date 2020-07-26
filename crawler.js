const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');
const writeStream = fs.createWriteStream('titulos.csv');

async function init() {
    let paginas = ['https://es.wikipedia.org/wiki/Python','https://en.wikipedia.org/wiki/C_(programming_language)','https://en.wikipedia.org/wiki/Java_(programming_language)']
    for(i=0;i<paginas.length;i++){
    try {
        const $ = await request({
            uri: paginas[i],
            transform: body => cheerio.load(body)
        });

        const websiteTitle = $('title').html();
        console.log('Title: ', websiteTitle);

        const webSiteHeading = $('h1').text().trim();
        console.log('Heading: ', webSiteHeading);
        writeStream.write(`${websiteTitle},${webSiteHeading}\n`);

        //const quote = $('.quote').find('a');
        //console.log(quote.html());

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
