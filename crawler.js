const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');
const { accessSync } = require('fs-extra');
const writeStream = fs.createWriteStream('titulos.txt');
const evitar = ["pdf","PDF"];

async function init() {
    let paginas = ['https://medium.com/javascript-scene/the-forgotten-history-of-oop-88d71b9b2d9f#:~:text=The%20big%20idea%20is%20messaging.%E2%80%9D&text=In%20a%202003%20email%20exchange,%2Dbinding%20of%20all%20things.%E2%80%9D']
    for(i=0;i < paginas.length && i<20;i++){
    try {
        const $ = await request({
            uri: paginas[i],
            transform: body => cheerio.load(body)
        });

        writeStream.write(`Titulo\n`);
        var websiteTitle = ""
        if ($('title').html())
            websiteTitle = $('title').html().trim();
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
                if (enlace != undefined)
                    enlacex = completar_link(enlace,paginas[i])
                if (verificar_link(evitar,enlace))
                    paginas.push(enlacex);
            })
        })
console.log(paginas);
    } catch (e) {
        console.log(e);
    }
}
}


function verificar_link (lista,link){
    result = true;
    if (link != undefined)
        lista.forEach(element => {
            if( link.indexOf(element) > -1){
                result = false;
            }
        });    
    return result;
}

function revisar_inicio (link){
    result = false;
    inicio = link.substr(0,4)
    parte = "http";
    if (inicio == parte){
        result = true;
    }

    return result;
}

function completar_link (link,linkInicial){
    if (revisar_inicio(link)){
        return link;
    }
    else{
        newlink = linkInicial.substr(0,linkInicial.indexOf("/",9))
        if(link[0] == "/")
            return newlink +  link;
        else
            return newlink + "/" + link;
    }
}



init();

