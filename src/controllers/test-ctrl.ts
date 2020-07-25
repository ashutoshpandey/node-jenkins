import * as express from 'express';
import { Request, Response } from 'express';

import BaseController from './base-ctrl';

export class TestController implements BaseController{
	public router = express.Router();

	constructor() {
        this.initializeRoutes();
    }

    /**
     * @function initializeRoutes
     * Initializes API routes
     */
    public initializeRoutes() {	
		this.router.get('/test', (req: Request, res: Response) => { this.test(req, res) });
	}

 	public test(req: Request, res: Response): void {
        res.status(200).send({
            data: 'This is test'
        });
    }
}