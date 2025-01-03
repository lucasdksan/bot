import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { EnvConfig } from "../shared/infrastructure/config/env/env-config";

export type RouteConfig = {
    method: "get" | "post" | "put" | "delete";
    path: string;
    handler: RequestHandler;
};

export type RouteMConfig = {
    method: "get" | "post" | "put" | "delete";
    path: string;
    middlewares: RequestHandler[];
    handler: RequestHandler;
}

export type RouteWithMiddlewareConfig = {
    controller: any;
    routes: RouteMConfig[];
};

export class Routes {
    private readonly _router: Router;

    constructor(private readonly envConfig: EnvConfig) {
        this._router = Router();
    }

    /**
    * Registra múltiplos controladores e suas rotas.
    * @param controllersConfig - Lista de controladores e suas respectivas rotas.
    */
    registerControllers(controllersConfig: { controller: any; routes: RouteConfig[] }[]): void {
        controllersConfig.forEach(({ controller, routes }) => {
            routes.forEach((route) => {
                this._router[route.method](route.path, this.wrapController(route.handler.bind(controller)));
            });
        });
    }

    /**
    * Registra múltiplos controladores com middlewares.
    * @param controllersWithMiddlewaresConfig - Lista de controladores com suas respectivas rotas e middlewares.
    */
    registerRouteWithMiddlewares(controllersWithMiddlewaresConfig: RouteWithMiddlewareConfig[]): void {
        controllersWithMiddlewaresConfig.forEach(({ controller, routes }) => {
            routes.forEach(({ method, path, middlewares, handler }) => {
                const wrappedHandler = this.wrapController(handler.bind(controller));
                this._router[method](path, ...middlewares, wrappedHandler);
            });
        });
    }

    /**
    * Captura erros de controladores assíncronos.
    */
    private wrapController(handler: RequestHandler) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handler(req, res, next);
            } catch (error) {
                next(error);
            }
        };
    }

    public get router(): Router {
        return this._router;
    }
}