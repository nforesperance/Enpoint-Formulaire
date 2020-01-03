
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('./config')

// Author routes

// Get All Authors
// route author/all
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
  

module.exports = router;