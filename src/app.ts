import cors from 'cors';
import path from "path";
import helmet from 'helmet';
import express from 'express';
import * as bodyParser from 'body-parser';

import BaseController from './controllers/base-ctrl';

class App {
    public app: express.Application;

    constructor(controllers: any) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        const { SERVER_PORT = 3000 } = process.env;
        const { SERVER_ROOT_URL = "http://localhost:${SERVER_PORT}" } = process.env;

        this.app.listen(SERVER_PORT, () => {
            console.log(`Server is running at port: ` + SERVER_PORT);
        });
    }

    /**
     * @function initializeMiddlewares
     * @description Initializes all middlewares
     */
    public initializeMiddlewares() {
        /**
         * Allow cors requests from white listed urls
         */
        /*
        let originsWhitelist = config.WHITE_LISTED_URLS;
        if (originsWhitelist) {
            let corsOptions = {
                origin: function (origin: any, callback: any) {
                    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
                    callback(null, isWhitelisted);
                },
                credentials: true
            };

            this.app.use(cors(corsOptions));
        }
        */

        this.app.use((request: express.Request, response: express.Response, next: any) => {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', '*');
            response.setHeader('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,authToken,loggedusertype,loggeduserid,clinicid');
            next();
        });

        this.app.use(helmet());

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '20mb' }));
        this.app.use(express.static('public'));

        this.app.use((request: express.Request, response: express.Response, next: any) => {
            request.body.startTime = new Date();
            next();
        });

        // Configure Express to use EJS
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
    }

    /**
     * @function initializeControllers
     * @description Initializes all routes
     * @param controllers 
     */
    public initializeControllers(controllers: BaseController[]) {
        let that = this;

        controllers.forEach((controller) => {
            that.app.use('/', controller.router);
        });
    }
}

export default App;