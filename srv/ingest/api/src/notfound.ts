import { Context, Next } from "koa";

export const notfound = async (ctx: Context, next: Next) => {
    ctx.body=`Path not found: ${ctx.path}`;
    ctx.status=404;

    await next();
}
