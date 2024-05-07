import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JsonHeaderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.setHeader('Content-Type', 'application/json');
        next();
    }
}
