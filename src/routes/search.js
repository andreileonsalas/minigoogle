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

  const word = req.params.id;
  console.log(word);

  pool.query('SELECT * FROM pruebaDatos', (error, result) => {
    if (error) throw error;
    console.log(result);
    //res.send(result);
    res.render('search', {
      results: result
    });
  });

  // const id = req.params.id;
  // const body = JSON.parse(id);
  // console.log(body);
  // res.render('search');



  //res.render('search');


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
