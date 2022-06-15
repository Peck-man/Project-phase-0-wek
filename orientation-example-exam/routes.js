const {fourDigitCode} = require('./functions.js');

const express = require('express');
const app = express();
//const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();
const connection = require('./database');

app.use(express.json()); //body parsing
app.use(express.static('frontend')); //creating connection with static file folder
// app.use(express.urlencoded({ extended: true }));

//GET MAIN PAGE
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

/*     
fs.promises.access(__dirname + '/frontend/index.html', fs.constants.R_OK)
.then(() => res.status(200).sendFile(__dirname + '/frontend/index.html'))
.catch(() => res.status(404).json({error: "page not found"}));
*/

//GET ALL THE POSTS WITHOUT SECRETCODE
app.get('/api/links', (req, res) => {
    const sql = `SELECT id, url, alias, hitCount FROM aliaser.url_alias`;
    connection.query(sql, function(error, data) {
        if (error) {
            res.status(500).json(error);
            return;
        }
        //console.log(data);
        res.status(200).json(data);
    });
});

//ADD NEW POST
app.post('/api/links', (req, res) => {
    //console.log(req.body);
    if (req.body.URL == 'undefined' || req.body.alias == 'undefined') {
        app.status(404).json({error: 'field is undefined'});
    }
    
    const data = {
        url: req.body.URL,
        alias: req.body.alias,
        hitCount: 0,
        secretCode: fourDigitCode()
    }
    
    const sql = `SELECT EXISTS(SELECT * FROM url_alias WHERE alias = "${req.body.alias}")`;
    connection.query(sql, function(error, results) {
        if (error) {
          res.status(500).json(error);
          return;
        }
        if (Object.values(results[0])[0] === 0) {
            const sql = `INSERT INTO aliaser.url_alias SET ?`
            connection.query(sql, data, function(error, results) {
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                //console.log(data);
                //console.log(results);
                const sql = `SELECT * FROM aliaser.url_alias WHERE url_alias.id = ${results.insertId}`;
                connection.query(sql, results.insertId, function(error, data) {
                    if (error) {
                        res.status(500).json(error);
                        return;
                    }
                    //console.log(data);
                    res.status(200).json(data[0]);
                });
            });
        } else {
            console.log(req.body);
            res.status(400).json({message: "Your alias is already in use!"});
        }
    });
});

//INCREMENT HIT COUNT BY 1 AND RENDER URL
app.get('/a/:alias', (req, res) => {
    const sql = `SELECT url FROM aliaser.url_alias WHERE alias = "${req.params.alias}"`;
    connection.query(sql, function(error, results) {
        if (error) {
            res.status(404).json(error);
            return;
        }
        const sql = `UPDATE aliaser.url_alias SET hitCount = hitCount + 1 WHERE alias = "${req.params.alias}"`;
        connection.query(sql, function(error, results) {
            if (error) {
                res.status(404).json(error);
                return;
            }
        });
        res.status(200).redirect('http://' + results[0].url);
    });
});

//DELETE POST WITH ID
app.delete('/api/links/:id', (req, res) => {
    const sql = `SELECT EXISTS(SELECT * FROM aliaser.url_alias WHERE id = ${req.params.id});`;
    connection.query(sql, function(error, results) {
        if (Object.values(results[0])[0] === 1) {
            const sql = `DELETE FROM aliaser.url_alias WHERE id = ${req.params.id} AND secretCode = ${req.body.secretCode};`;
            connection.query(sql, function(error, data) {
                if (error) {
                    res.status(403).json(error)
                }
                res.status(204).send(`message: Alias with ID: ${req.params.id} is deleted from database`);
            });
        } else {
            //console.log(`${req.params.id}`);
            res.status(404).send('error');
        }
    });
});

module.exports = app; // SENDING ROUTES.JS MODULE TO SERVER.JS