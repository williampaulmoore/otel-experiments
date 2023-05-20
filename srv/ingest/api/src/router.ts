import Router from 'koa-router';
import { imports } from './resources/imports';

const router = new Router();

router.get('/api/imports', imports );

export default router;
