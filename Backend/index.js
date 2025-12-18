let express = require("express");
let app = express();
let path = require("path");
let port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));


app.listen(port,()=>console.log(`Server is running at htttp://localhost:${port}`));