const express = require('express');
const router = express.Router();

// Load the MySQL pool connection
const pool = require('../../mysql');

router.get('/search',async (req,res)=>{
    const body = req.body;
    console.log(body);
    res.render('search');

});

router.get('/search/:id',async (req,res)=>{
  /*
  const word = req.params.id;
  console.log(word);

  pool.query('SELECT * FROM searchfinal WHERE keyword = "' + word + '" ORDER BY weight DESC', (error, result) => {
    if (error) throw error;
    console.log(result);
    //res.send(result);
    res.render('search', {
      results: result
    });
  });
  */

  const word = req.params.id;
  console.log(word);
  var splitted = word.split(" ");
  console.log(splitted);
  console.log(splitted.length);
  if (splitted.length < 2){

    pool.query('SELECT link, weight AS CWeight FROM searchfinal WHERE keyword = "' + word + '" ORDER BY weight DESC', (error1, result1) => {
      if (error1) throw error1;
      pool.query('SELECT link, weight AS CWeight FROM cantidadPorPagina WHERE keyword = "' + word + '" ORDER BY weight DESC', (error2, result2) => {
        if (error2) throw error2;

        var total = 0;
        for (var i = 0; i < result2.length; i++) {
          total += result2[i].CWeight;
        }
        var result3 =
          [
            {
              keyword: word,
              count: total
            }
          ]

        console.log(result1);
        //res.send(result);
        console.log(result2);
        //res.send(result);
        console.log("Total: " + total);


        res.render('search', {
          results: result1,
          resultsPagina: result2,
          resultsGeneral: result3,
          palabras: word
        });

      });

    });
  }
  else {
    //SELECT * FROM `searchfinal` WHERE keyword = "he" OR keyword = "hasta" GROUP BY link ORDER BY weight DESC;
    //SELECT t0.link, t0.keyword, t0.weight FROM (SELECT * FROM `searchfinal` WHERE keyword = "hasta" OR keyword = "he" ) AS t0
    /*
    SELECT link, SUM(weight) AS CWeight, count(link) AS CLink
    FROM `searchfinal`
    WHERE keyword = "hasta" OR keyword = "he" OR keyword = "Stéfano"
    GROUP BY link
    HAVING CLink > 2
    ORDER BY CWeight DESC
    */

    var consultaInicio = 'SELECT link, SUM(weight) AS CWeight, count(link) AS CLink FROM ';
    var consultaWhere = ' WHERE keyword = "';
    var consultaMedio = ' GROUP BY link HAVING CLink > ';
    var consultaHaving = splitted.length-1;
    var consultaFinal = ' ORDER BY CWeight DESC ';

    for (var i = 0; i < splitted.length; i++) {
      consultaWhere += splitted[i];
      consultaWhere += '" ';
      if(i < splitted.length - 1){
        consultaWhere += ' OR keyword = "';
      }
    }

    var consultaSearchFinal = consultaInicio + 'searchfinal' + consultaWhere + consultaMedio + consultaHaving + consultaFinal;
    console.log(consultaSearchFinal);
    var consultaPorPagina = consultaInicio + 'cantidadPorPagina' + consultaWhere + consultaMedio + consultaHaving + consultaFinal;

    pool.query(consultaSearchFinal, (error1, result1) => {
      if (error1) throw error1;

      // console.log(result1);
      // var result2 = {}
      // var result3 = {}
      // res.render('search', {
      //   results: result1,
      //   resultsPagina: result2,
      //   resultsGeneral: result3,
      //   palabras: word
      // });

      pool.query(consultaPorPagina, (error2, result2) => {
        if (error2) throw error2;

        var total = 0;
        for (var i = 0; i < result2.length; i++) {
          total += result2[i].CWeight;
        }
        var result3 =
          [
            {
              keyword: word,
              count: total
            }
          ]

        console.log(result1);
        //res.send(result);
        console.log(result2);
        //res.send(result);
        console.log("Total: " + total);


        res.render('search', {
          results: result1,
          resultsPagina: result2,
          resultsGeneral: result3,
          palabras: word
        });

      });

    });

  }

});


router.post('/search/:id',async (req,res)=>{

  const body = req.body;
  var word = body.word;

  console.log(word);

  res.redirect('/search/' + word);

  // pool.query('SELECT * FROM pruebaDatos', (error, result) => {
  //   if (error) throw error;
  //   console.log(result);
  //   //res.send(result);
  //   res.render('search', {
  //     results: result
  //   });
  // });

  // const id = req.params.id;
  // const body = JSON.parse(id);
  // console.log(body);
  // res.render('search');



  //res.render('search');


});


router.post('/neo/nodosTest/:id',async(req,res)=>{
    //const {nodo1, nodo2}=req.body;
    const driver = neo4j.driver("bolt://vps-2ec0dbf6.vps.ovh.ca", neo4j.auth.basic('neo4j', 'test'))
    const session = driver.session()

    const {nodo1}=req.body;
    const errors=[];
    if(nodo1.length<=0){
        errors.push({text: 'Inserte una busqueda'});
    }
    /*if(nodo2.length<=0){
        errors.push({text: 'Inserte su primer nodo 2'});
    }*/
    if(errors.length>0){
        res.render('/neo/nodosTest', {errors, nodo1});

    }
    else{
        async function main() {
          try {
            const busqueda = nodo1
            const result = await session.run(
              //'CREATE (a:Person {name: $name}) RETURN a',
              'MATCH (nodo :Producto {name: $name})-[:SIMILAR_A]->(otros) RETURN otros',
              { name: busqueda }
            )

            const contexto = {
                nodes: result.records.map(record => {
                return {
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name
                }
              })
            }
            //res.json(contexto);

            /*
            const singleRecord = result.records[0]
            const node = singleRecord.get(0)

            console.log(node.properties.name)*/
          } catch (error) {
              console.log(error)
          } finally {
            await session.close()
          }

          // on application exit:
          await driver.close()
        }
        main();

        res.redirect('/neo/nodosTest/'+nodo1);
    }
});

module.exports=router;
