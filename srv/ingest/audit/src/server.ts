import { env } from '../env.mjs';
import Koa from 'koa';

const app = new Koa();

app.listen(env.LISTEN_ON_PORT, env.LISTEN_ON_ADDRESS, () => {
    console.log(`Server running on http://${env.LISTEN_ON_ADDRESS}:${env.LISTEN_ON_PORT}`);
});

