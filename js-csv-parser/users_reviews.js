function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

const Papa = require('papaparse')
const fs = require('fs')

// users table implementation 
const usersFile = ('./csv/appUsers.csv')
const usersContent = fs.readFileSync(usersFile, "utf8")

// get usernames
const usernames = []
Papa.parse(usersContent, {
  header: true,
  skipEmptyLines: true,
  step: function(result) {
    const { username, rowID } = result.data[0]
    
    usernames.push({ username, userId: rowID })
  }
})

// reviews table implementation
const animesFile = ('./csv/animeIds.csv')
const reviewsFile = ('./csv/reviews.csv')
const animesContent = fs.readFileSync(animesFile, "utf8")
const reviewsContent = fs.readFileSync(reviewsFile, "utf8")
const fillerReviews = [
  "Kinda sucks", 
  "Pretty good. Has a solid story and solid characters", 
  "Excellent. Deserves more recognition",
  "Really underwhelming. Was pretty disappointed",
  "Wow. I cannot believe I wasted my time on this",
  "AMAZING!!!! 10/10 everyone watch this right now",
  "Sub-par. You'd be better off watching Hunter x Hunter",
  "Masterpiece. Same level of quality you would see out of Attack on Titan and My Hero Academia",
  "Shows like these are the reason why I stay in on the weekends"
]

// get anime_id's 
const animeIds = []
Papa.parse(animesContent, {
  header: true,
  skipEmptyLines: true,
  step: function(result) {
    const { anime_id } = result.data[0]
    animeIds.push(anime_id)
  }
})

// sort anime_id's desc 
animeIds.sort( (num1, num2) => {
  return num1 - num2
})

// create reviews csv data
let anime_index = 0 
const reviewsArray = []
let usernames_copy = Array.from(usernames)

Papa.parse(reviewsContent, {
  header: true,
  skipEmptyLines: true,
  step: function(result) {
    const review_hardsource = result.data[0].reviews ? result.data[0].reviews : fillerReviews[Math.floor(Math.random()*fillerReviews.length)]
    const review = review_hardsource.replace(/,/g, "").replace("\n", " ").replace(/"/g, " ")
    const userInfo = usernames_copy.shift()

    reviewsArray.push({ review, anime_id: animeIds[anime_index], userId: userInfo.userId, dateTime: new Date().toMysqlFormat() })
    anime_index++;
    
    if (anime_index === animeIds.length - 1) {
      anime_index = 0;
    }

    if (usernames_copy.length === 0) {
      usernames_copy = Array.from(usernames)
    }
  }
})

// reviews table
const reviewsCsv = Papa.unparse(reviewsArray)
fs.writeFile("./csv/tableReviews.csv", reviewsCsv, err => {
  if (err) throw err;

  console.log("Reviews Table successfully saved")
})

// create users csv data
const usersArray = [] 
Papa.parse(usersContent, {
  header: true,
  skipEmptyLines: true,
  step: function(result) {
    const data = result.data[0]

    usersArray.push({ ...data })
  }
})

// users table
const usersCsv = Papa.unparse(usersArray)
fs.writeFile("./csv/tableUsers.csv", usersCsv, err => {
  if (err) throw err;

  console.log("Users Table successfully saved")
})

// user to review csv data
const userReviewArray = []
reviewsArray.forEach(({ review, userId }) => {
  userReviewArray.push({ userId, review })
})

const userReviewCsv = Papa.unparse(userReviewArray)
fs.writeFile("./csv/tableUserReview.csv", userReviewCsv, err => {
  if (err) throw err;

  console.log("User_Review Table successfully saved")
})