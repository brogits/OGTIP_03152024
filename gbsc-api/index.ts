import cors from "cors";
import * as dotenv from "dotenv"
import express from "express";
import helmet from "helmet";
import nocache from "nocache";
import {videoRouter} from './api/video.server'

dotenv.config();
const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;


if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const app = express();
const apiRouter = express.Router();

const parser = require('body-parser');

app.use(express.json());
app.set("json spaces", 2);
app.use(parser.json());
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});

app.use(nocache());

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

app.use("/api", apiRouter);

app.get('/ping', (req, res) => {
  res.status(200).json({success: true, message:'We got fish -)>', value: 'Hello world! Jesus Loves you.'});
});

//apiRouter.use("/vids", vidRouter);
apiRouter.use('/vids', videoRouter)




app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
