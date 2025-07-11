import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = Date.now();

    // Response tamamlandığında log
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      // Hassas endpoint'leri maskele
      const maskedUrl = this.maskSensitiveData(originalUrl);

      this.logger.log(
        `${method} ${maskedUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${responseTime}ms`,
      );

      // Hata durumlarını ayrı logla
      if (statusCode >= 400) {
        this.logger.error(
          `Error ${statusCode}: ${method} ${maskedUrl} - ${ip}`,
        );
      }
    });

    next();
  }

  private maskSensitiveData(url: string): string {
    // Hassas parametreleri maskele
    return url
      .replace(/password=[^&]*/g, 'password=***')
      .replace(/token=[^&]*/g, 'token=***')
      .replace(/secret=[^&]*/g, 'secret=***');
  }
}
