import Router from 'koa-router';
import { audits } from './resources/audits';

const router = new Router();

router.post("/api/audits", audits);

export default router;
