import { z } from "zod";
import dotenv from "dotenv";
import { IEnv } from "./env-interface";
import { schema } from "./env-schema";

export class EnvConfig implements IEnv {
    private config: z.infer<typeof schema>;

    constructor() {
        dotenv.config();

        this.config = schema.parse({
            port: Number(process.env.PORT),
            jwtSecrete: String(process.env.JWT_SECRET),
            jwtExpiresIn: String(process.env.JWT_EXPIRES_IN),
        });
    }

    getPort(): number {
        return this.config.port;
    }
    
    getJwtSecret(): string {
        return this.config.jwtSecrete;
    }

    getJwtExpiresIn(): string {
        return this.config.jwtExpiresIn;
    }
}