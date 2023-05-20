import { Context } from "koa";

export const imports = async (ctx: Context) => {
    ctx.body={ message: 'imports' };
    ctx.status=200;
}
