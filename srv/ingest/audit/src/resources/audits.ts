import { Context } from 'koa';

export const audits = async (ctx: Context) => {
    ctx.body = { message: 'audit' };
    ctx.status=200;
}
