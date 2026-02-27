const express = require("express");
const path = require("path");
require("./config/db.config");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const { passport, currentAdmin } = require("./middleware/passport.middleware");
const { setFlash } = require("./middleware/flash.middleware");

const PORT = 9000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
    session({
        name: "AdminPenelSession",
        secret: "01538081",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(currentAdmin);
app.use(setFlash);

app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not started", err);
        return;
    }
    console.log(`Server is started`);
});
