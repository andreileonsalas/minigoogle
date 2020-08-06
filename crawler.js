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
    let paginas = [['https://es.wikipedia.org/wiki/Real_Madrid_Club_de_F%C3%BAtbol','https://es.wikipedia.org/wiki/Segunda_Guerra_Mundial','https://es.wikipedia.org/wiki/Pol%C3%ADtica', 'https://es.wikipedia.org/wiki/COVID-19']]
    let utilizados = []
    for(j=0;j<paginas.length && j<5; j++){
        let band = 0
        for(i=0;i < paginas[j].length && i< 5;i++){
            console.log(paginas[j][i]);
        try {
            const $ = await request({
                uri: paginas[j][i],
                transform: body => cheerio.load(body)
            });

            writeStream_all.write(`href|${paginas[j][i]}\n`);
            var websiteTitle = ""
            if ($('title').html())
                websiteTitle = $('title').html().trim();
                writeStream_all.write(`Titulo|${websiteTitle}\n`);

            $('h1').each(function(){
                const h1 = $(this).text().trim();
                writeStream_all.write(`h1|${h1}\n`);
            })

            $('h2').each(function(){
                const h2 = $(this).text().trim();
                writeStream_all.write(`h2|${h2}\n`);
            })

            $('h3').each(function(){
                const h3 = $(this).text().trim();
                writeStream_all.write(`h3|${h3}\n`);
            })

            $('h4').each(function(){
                const h4 = $(this).text().trim();
                writeStream_all.write(`h4|${h4}\n`);
            })


            $('p').each(function(){
                const p = $(this).text();
                writeStream_all.write(`p|${p}\n`);
            })
            

            $('p').each(function() {
                $(this).find('a').each(function() {
                    let enlace =$(this).attr('href');
                    if (enlace != undefined)
                        enlacex = completar_link(enlace,paginas[j][i])
                    if (verificar_link(evitar,enlace))
                    if (band==0){
                        paginas.push([enlacex]);
                        band = 1
                    }
                    else{
                        var flag = true;
                        for (l = 0  ;l < paginas.length && flag == true; l++){
                            if (rep(paginas[l],enlacex))
                                flag = false
                        }
                        if (flag){
                            
                            paginas[j+1].push(enlacex);
                        }
                    }
                   
                        
                })
            })
    
        } catch (e) {
            console.log(e);
        }
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

