const express = require('express')
const app = express();
const path = require('path'); 
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, '..', '/build');
app.use(express.static(publicPath));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(publicPath)));
    console.log("listening on prod")
}
else {
    console.log("listening on dev")
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'..','/public/index.html'))
    });
}

app.listen(port, (req, res) => {
    console.log("server running on port " + port);
});