import { number, z } from "zod";

let result = z.object({
    LISTEN_ON_ADDRESS: z.literal("localhost").or(z.string().ip("Invalid: is not an ip address")),
    LISTEN_ON_PORT: z.string().regex(/^\d+$/, "Invalid: is not a port number").transform((v) => parseInt(v))
}).safeParse({
    LISTEN_ON_ADDRESS: process.env.LISTEN_ON_ADDRESS,
    LISTEN_ON_PORT: process.env.LISTEN_ON_PORT
});

if (result.success == false)
{
    var { error } = result;
    var errors = error.flatten();

    console.error(errors);

    throw new Error("Envrionment expectations not met");
}

export const env = result.data;
