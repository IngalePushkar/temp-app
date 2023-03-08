const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const port = 3000


const logger = new winston.createLogger(myWinstonOptions)
app.use(bodyParser.urlencoded({
    extended: true
  }));
function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)


function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/log', (req, res) => {
    logger.info(req.body);
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
})
