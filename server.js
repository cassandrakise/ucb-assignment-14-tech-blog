const express = require("express");
const session = require("express-session");
const exphbs = require('express-handlebars');
const routes = require("./controllers");
const helper = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3306;

const sess = {
    
    secret: "whatAseCRET",
    cookie: {},
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false,
    saveUnitialized: true
};

app.use(session(sess));

const hbs = exphbs.create({helper});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});