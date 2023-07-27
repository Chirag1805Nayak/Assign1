var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var aboutRouter = require("./routes/about");
var contactRouter = require("./routes/contact");
var projectRouter = require("./routes/project");
var supportmeRouter = require("./routes/supportme");
var successRouter = require("./routes/success");
var cancelRouter = require("./routes/cancel");
var usersRouter = require("./routes/users");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/project", projectRouter);
app.use("/project", supportmeRouter);
app.use("/success", successRouter);
app.use("/cancel", cancelRouter);
app.use("/users", usersRouter);

const stripe = require("stripe")(
  "sk_test_51M5FiMHFIxoUL2rglbJfaInn2YPKMHm5KbvgFOlmMmYiX65PKdSaEalmWDICKgiRLYvRKb2Rmwg94ETHFq5eg4Bo00kCEiKKAR"
);

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1NYXAkHFIxoUL2rg4Sa9Grl1",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.redirect(303, session.url);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
