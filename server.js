const PORT      = process.env.PORT || 8080;
const express   = require('express');
const app       = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
});
app.use((req, res) => {
    res.send("NOT FOUND");
});

app.listen(PORT, () => {
    console.log("Listening");
});