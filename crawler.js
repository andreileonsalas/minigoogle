const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');
const { accessSync } = require('fs-extra');

const evitar = ["pdf","PDF"];
const writeStream_all = fs.createWriteStream('all.txt');
function rep(l,e){
    var found = l.find(function (element) { 
        return element == e; 
    }); 
    if(found){
        return true
    }
    else{
        return false
    }
}

async function init() {
    let paginas = ['https://es.wikipedia.org/wiki/Real_Madrid_Club_de_F%C3%BAtbol','https://es.wikipedia.org/wiki/Segunda_Guerra_Mundial','https://es.wikipedia.org/wiki/Pol%C3%ADtica', 'https://es.wikipedia.org/wiki/COVID-19' ]
    for(i=0;i < paginas.length && i<6;i++){
        const writeStream = fs.createWriteStream('pagina'+(i+1)+'.txt');
    try {
        const $ = await request({
            uri: paginas[i],
            transform: body => cheerio.load(body)
        });
        writeStream.write('href|'+paginas[i]+"\n");
        var websiteTitle = ""
        if ($('title').html())
            websiteTitle = $('title').html().trim();
            writeStream.write(`Titulo|${websiteTitle}\n`);
            writeStream_all.write(`Titulo|${websiteTitle}\n`);

        $('h1').each(function(){
            const h1 = $(this).text().trim();
            writeStream.write(`h1|${h1}\n`);
            writeStream_all.write(`h1|${h1}\n`);
        })

        $('h2').each(function(){
            const h2 = $(this).text().trim();
            writeStream.write(`h2|${h2}\n`);
            writeStream_all.write(`h2|${h2}\n`);
        })

        $('h3').each(function(){
            const h3 = $(this).text().trim();
            writeStream.write(`h3|${h3}\n`);
            writeStream_all.write(`h3|${h3}\n`);
        })

        $('h4').each(function(){
            const h4 = $(this).text().trim();
            writeStream.write(`h4|${h4}\n`);
            writeStream_all.write(`h4|${h4}\n`);
        })

        $('p').each(function(){
            const p = $(this).text();
            writeStream.write(`p|${p}\n`);
            writeStream_all.write(`p|${p}\n`);
        })
        
        $('p').each(function() {
            $(this).find('a').each(function() {
                let enlace =$(this).attr('href');
                //writeStream.write(`href|${enlace}\n`);
                //writeStream_all.write(`href|${enlace}\n`);
                if (enlace != undefined){
                    enlacex = completar_link(enlace,paginas[i])
                if (verificar_link(evitar,enlace))
                    paginas.push(enlacex);
                }
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
       //console.log(link)
       //console.log(linkInicial)
        
        pos =  link.indexOf("/",1);
        partelink = link.substr(0,pos);
        //console.log(partelink );
        newlink = "";

        if (partelink.length == 0){
            newlink = linkInicial.substr(0,linkInicial.indexOf("/",9))
            //console.log("entro al 1 ")
        }
        else{
          //  console.log("entro al segundo alt e")
            pos2 = linkInicial.indexOf(partelink,0)
            if (pos2 == -1){
                newlink = linkInicial.substr(0,linkInicial.indexOf("/",9))
            }
            else{
                newlink = linkInicial.substr(0,pos2)
            }
        }
        //console.log("la parte del link es: " + newlink + "\n");
        if(link[0] == "/")
            return newlink +  link;
        else
            return newlink + "/" + link;
    }
}



init();

