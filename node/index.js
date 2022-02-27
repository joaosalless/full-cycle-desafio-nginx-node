const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(
    `CREATE TABLE IF NOT EXISTS people (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    );`
)

const sqlInsert = `INSERT INTO people (name) values ('João')`
connection.query(sqlInsert)

const sqlSelect = `SELECT name FROM people`;
connection.query(sqlSelect, (err, result, fields) => {
  if (err) {
    throw err;
  }
  resultPeople = result.map(p => '<li>' + p.name + '</li>')
});
connection.end()

app.get('/', (req, res) => {
  res.send(`<h1>Full Cycle Rocks!</h1><h2>Nomes:</h2><ul>${resultPeople.join('')}</ul>`)
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})