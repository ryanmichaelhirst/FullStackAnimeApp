const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = 4000
const db = mysql.createConnection({
  multipleStatements: true,
  host: 'localhost',
	port: '3306',
  user: 'root',
  database: 'Anime'
})

// add cors middleware for post requests
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function executeQuery(query, res) {
  db.query(query, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
}

app.get('/allAnime', (req, res) => {
  const sql = "SELECT * FROM Anime"
  executeQuery(sql, res)
})

app.get('/animeById/:id', (req, res) => {
  const sql = `SELECT * FROM Anime WHERE anime_id = '${req.params.id}'`
  executeQuery(sql, res)
})

app.get('/animeByName/:name', (req, res) => {
  const sql = `SELECT * FROM Anime WHERE name = '${req.params.name}'`
  executeQuery(sql, res)
})

app.get('/deleteAnime/:id', (req, res) => {
  const sql = `DELETE FROM Anime WHERE anime_id = ${req.params.id}`
  executeQuery(sql, res)
})

app.get('/resetAnime', (req, res) => {
  const sql = "DROP TABLE IF EXISTS Anime;" +
    "CREATE TABLE Anime (row_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), anime_id INT, type VARCHAR(255), episodes INT, rating DECIMAL, members INT);" +
    "LOAD DATA LOCAL INFILE 'res/tableAnimes.csv' INTO TABLE Anime FIELDS TERMINATED BY ',' IGNORE 1 LINES (name, anime_id, type, episodes, rating, members);"  
  executeQuery(sql, res)
})

app.get('/reviewsByAnimeId/:id', (req, res) => {
  const sql = `SELECT r.review, r.anime_id, r.user_id, u.username, r.date_time
    FROM Anime.REVIEWS AS r
      LEFT JOIN Anime.USERS as u
      ON r.user_id = u.user_id
    WHERE r.anime_id = ${req.params.id}`
  executeQuery(sql, res)
})

app.get('/genresByAnimeId/:id', (req, res) => {
  const sql = `SELECT g.genre
    FROM Anime AS a
      LEFT JOIN Anime_genre AS ag
      ON a.anime_id = ag.anime_id
      JOIN Genres AS g
      ON ag.genre_id = g.id
    WHERE a.anime_id = ${req.params.id}`
  executeQuery(sql, res)
})

app.get('/allGenres', (req, res) => {
  const sql = 'SELECT * FROM GENRES WHERE ID != 1'
  executeQuery(sql, res)
})

app.post('/addAnime/:name/:animeId/:type/:episodes/:rating/:members/:genres', (req, res) => {
  const insertAnime = `INSERT INTO Anime (name, anime_id, type, episodes, rating, members) 
    VALUES ('${req.body.name}', ${req.body.animeId}, '${req.body.type}',
             ${req.body.episodes}, ${req.body.rating}, ${req.body.members})`
  
  const insertAnimeGenres = []
  Object.keys(req.body.genres).forEach(key => {
    const id = req.body.genres[key]
    const sql = `INSERT INTO Anime_Genre (anime_id, genre_id) VALUES ('${req.body.animeId}', ${id})`
    insertAnimeGenres.push(sql)
  })

  const queries = [insertAnime, ...insertAnimeGenres]
  executeQuery(queries.join(';'), res)
})

app.get('/largestAnimeId', (req, res) => {
  const sql = `SELECT MAX(anime_id) FROM Anime`
  executeQuery(sql, res)
})

app.get('/resetAnimeGenre', (req, res) => {
  const sql = 'DROP TABLE IF EXISTS Anime_Genre;'
    + "CREATE TABLE Anime_Genre (row_id INT AUTO_INCREMENT PRIMARY KEY, anime_id INT, genre_id INT);"
    + "LOAD DATA LOCAL INFILE 'res/tableAnimeGenre.csv' INTO TABLE Anime_Genre FIELDS TERMINATED BY ',' IGNORE 1 LINES (anime_id, genre_id)"
  executeQuery(sql, res)
})

app.get('/getAllUsers', (req, res) => {
  const sql = 'SELECT * FROM Users'
  executeQuery(sql, res)
})

app.get('/getUser/:id', (req, res) => {
  const sql = `SELECT * FROM Users WHERE user_id = ${req.params.id}`
  executeQuery(sql, res)
})

app.put('/editUser/:userid/:username:/:firstname/:lastname/:email/:password/:gender/:hexcolor', (req, res) => {
  const sql = `UPDATE Users 
    SET username = '${req.body.username}',
        first_name = '${req.body.firstname}',
        last_name = '${req.body.lastname}',
        email = '${req.body.email}',
        password = '${req.body.password}',
        gender = '${req.body.gender}',
        hex_color = '${req.body.hexcolor}'
    WHERE user_id = ${req.body.userid}
  `
  executeQuery(sql, res)
})

app.get('/resetUsers', (req, res) => {
  const sql = 'DROP TABLE IF EXISTS Users;'
    + "CREATE TABLE USERS (user_id INT, first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255), gender VARCHAR(255), username TEXT, " 
    + "password VARCHAR(255), avatar_image VARCHAR(255), hex_color VARCHAR(255));"
    + "LOAD DATA LOCAL INFILE 'res/tableUsers.csv' INTO TABLE USERS FIELDS TERMINATED BY ',' IGNORE 1 LINES "
    + "(user_id, first_name, last_name, email, gender, username, password, avatar_image, hex_color);"
  executeQuery(sql, res)
})

app.get('/loginUser/:username/:password', (req, res) => {
  const sql = `SELECT * FROM Users WHERE username = '${req.params.username}' AND password = '${req.params.password}'`
  executeQuery(sql, res)
})

app.post('/postReview/:review/:animeId/:userId/:dateTime', (req, res) => {
  const insertReview = `INSERT INTO Reviews (review, anime_id, user_id, date_time) 
    VALUES ('${req.body.review}', ${req.body.animeId}, ${req.body.userId}, '${req.body.dateTime}')`
  const insertUserReview = `INSERT INTO USER_REVIEW (user_id, review) VALUES (${req.body.userId}, '${req.body.review}')`
  const queries = [insertReview, insertUserReview]
  executeQuery(queries.join(';'), res)
})

app.get('/resetReviews', (req, res) => {
  const sql = "DROP TABLE IF EXISTS Reviews;"
    + "CREATE TABLE Reviews (row_id INT AUTO_INCREMENT PRIMARY KEY, review VARCHAR(255), anime_id INT, user_id INT, date_time DATETIME);"
    + "LOAD DATA LOCAL INFILE 'res/tableReviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' "
    + "IGNORE 1 LINES (review, anime_id, user_id, date_time);"
  executeQuery(sql, res)
})

app.get('/resetUserReview', (req, res) => {
  const sql = "DROP TABLE IF EXISTS User_Review;"
    + "CREATE TABLE User_Review (user_id INT, review VARCHAR(255));"
    + "LOAD DATA LOCAL INFILE 'res/tableUserReview.csv' INTO TABLE User_Review FIELDS TERMINATED BY ',' "
    + "IGNORE 1 LINES (user_id, review);"
  executeQuery(sql, res)
})

app.listen(port, () => console.log(`Rest API listening on port ${port}!`))