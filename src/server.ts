import App from './app';

import { TestController } from './controllers/test-ctrl';

const app = new App(
    [
        new TestController()
    ]
);

app.listen();
