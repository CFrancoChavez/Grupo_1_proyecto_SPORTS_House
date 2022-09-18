

//código 3 sprint
const path = require("path");
const express = require("express");
const app = express();
const methodOverride =  require('method-override');
const mainRouter = require("./routers/mainRouters");
const routerDeProductos = require('./routers/productsRouter');
const usuariosRouter = require('./routers/userRouter');
const session = require('express-session'); //nuevo código session --konrad
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware'); //nuevo código mostrar enlaces de sesión --konrad
const cookies = require('cookie-parser'); //nuevo código cookies --konrad


const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'Keep the secret',
  resave: false,
  saveUninitialized: false
}));
app.use(cookies()); //nuevo código cookies --konrad

//app.use(userLoggedMiddleware); // pausa en este middleware para verificar funcionalidad sequelize
app.use('/productos', routerDeProductos);
app.use('/usuarios', usuariosRouter);
app.use("/", mainRouter);

app.listen(PORT, () => console.log("Servidor corriendo en el puerto: " + PORT));



