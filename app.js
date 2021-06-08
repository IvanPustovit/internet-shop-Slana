const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const forceSsl = require("express-force-ssl");
const connectDB = require("./DB/connect");
const routerItem = require("./Route/shopList.route");
const routerAuth = require("./Route/auth.routes");
const routerImg = require("./Route/imgUpload.routes");
const routerAdmin = require("./Route/adminPanel.routes");

const app = express();

const key = fs.readFileSync("ssl/private.key");
const cert = fs.readFileSync("ssl/certificate.crt");
const ca = fs.readFileSync("ssl/ca_bundle.crt");

const options = {
  key: key,
  cert: cert,
  ca: ca,
};

https.createServer(options, app).listen(443);
// http.createServer(app).listen(80);

app.use(forceSsl);
app.use(express.static("images"));
app.use(express.json());
app.use(helmet());
app.use(morgan());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://slana.net.ua",
      "https://slana.net.ua",
      "https://www.googleapis.com",
      "http://localhost:3000",
      "http://localhost:19006",
      "http://localhost:19001",
      "http://localhost:19000",
      "http://192.168.1.3:19006",
    ],
    optionsSuccessStatus: 200,
  })
);
app.use(function (req, res, next) {
  res.header(
    "Content-Security-Policy",
    "default-src 'self' https://fonts.googleapis.com http://slana.net.ua https://slana.net.ua https://fonts.gstatic.com https://firebasestorage.googleapis.com https://www.googleapis.com https://mern-slana-start.vercel.app  http://localhost:3000 http://localhost:19006 http://localhost:19001 http://localhost:19000 http://localhost:19002 https://storage.googleapis.com https://storage.googleapis.com/download/storage/v1/b/slana-88585.appspot.com https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline'" //;style-src self' https://fonts.googleapis.com;  font-src 'self' data: https://fonts.gstatic.com" //;object-src 'unsafe-inline';img-src 'self';media-src 'unsafe-inline';frame-src 'unsafe-inline';font-src 'unsafe-inline';connect-src 'unsafe-inline';style-src 'unsafe-inline'; style-src-elem 'self' '*.googleapis.com'"
  );
  next();
});
// process.env.NODE_ENV = "production";

app.use("/api/auth", routerAuth);
app.use("/api/", routerItem);
app.use("/item", routerItem);
app.use("/cart", routerItem);
// app.use("/api/", routerItem);
app.use("/admin", routerItem); //adItem
app.use("/upload", routerImg);
app.use("/api/admin", routerAdmin);
// app.get("/", (req, res) => {
//   res.send("Hello from Express!");
// });
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

console.log(process.env.NODE_ENV);
const PORT = process.env.PORT || 3011;

async function connect() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("ERROR", error);
    process.exit(1);
  }
}

connect();
