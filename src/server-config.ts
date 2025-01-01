import { Routes } from "./router/routes";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { PrismaService } from "./shared/infrastructure/database/prisma/prisma";

export const serverConfig = (env: EnvConfig)=> {
    const prisma = new PrismaService();
    const routes = new Routes(env);

    return {
        routes: routes.router,
    };
}