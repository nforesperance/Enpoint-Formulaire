
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('./config')

//structure d'un table
router.get('/:table', (req, res) => {
    let {table} = req.params;
        sequelize
            .query('SHOW Tables', {
                type: sequelize.QueryTypes.SHOWTABLES
            })
            .then(result => {
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
                            arr.push(data[0])
                            if(index == result.length-1){
                                res.json(arr)
                            }    
                        })   
                });
            })
})
  
  

module.exports = router;