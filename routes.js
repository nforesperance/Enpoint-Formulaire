
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('./config')
const labels = require("./labels.json")
// console.log(labels["id"]);




function construct(table) {
    let arr = []
    let required = false
    let type = ""
    let max = ''
    table.forEach((elt,index) => {

        //required
        if(elt["Null"]=="NO"){
            required = true;
        }

        //type
        if(elt["Type"].startsWith("var")){
            type = "string"
        }
        if(elt["Type"].startsWith("tex") ){
            type = "string"
        }
        if(elt["Type"].startsWith("tin")){
            type = "Boolean"
        }
        if(elt["Type"].startsWith("int")){
            type = "Integer"
        }
        max = elt["Type"].substring(
            elt["Type"].lastIndexOf("(") + 1, 
            elt["Type"].lastIndexOf(")"))
        const obj = {
            label:labels[elt["Field"]],
            validator:{
                required:required,
                max_lenght:max?max:undefined
            },
            name:elt["Field"],
           type:{
               type:type,
               id:elt["Field"],
           } 
        }
        arr.push(obj)
    });
   
  
    return arr
}


//structure d'un table
router.get('/:table', (req, res) => {
    let {table} = req.params;
        sequelize
            .query('SHOW Tables', {
                type: sequelize.QueryTypes.SHOWTABLES
            })
            .then(result => {
                console.log(result);
                
                result.forEach(elt => {
                    if(elt == table){
                        sequelize.query("SHOW COLUMNS FROM "+elt)
                        .then(data => res.json(construct(data[0])) )
                    }
                    
                });
            })

})


//structure d'un table
router.get('/test/:table', (req, res) => {
    let {table} = req.params;
        sequelize
            .query('SHOW Tables', {
                type: sequelize.QueryTypes.SHOWTABLES
            })
            .then(result => {
                console.log(result);
                
                result.forEach(elt => {
                    if(elt == table){
                        sequelize.query("SHOW COLUMNS FROM "+elt)
                        .then(data => res.json(data[0]) )
                    }
                    
                });
            })

})

//structure of all tables
router.get('/', (req, res) => {
      const arr = []
        sequelize
            .query('SHOW Tables', {
                type: sequelize.QueryTypes.SHOWTABLES
            })
            .then(result => {
                result.forEach((elt,index) => {
                    sequelize.query("SHOW COLUMNS FROM "+elt)
                        .then(data => {
                            arr.push(construct(data[0]))
                            if(index == result.length-1){
                                res.json(arr)
                            }    
                        })   
                });
            })
})

  
  

module.exports = router;