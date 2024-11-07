// src/common/logger/logger.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string, context: string) {
    console.log(`[${context}] ${message}`);
  }

  error(message: string, context: string) {
    console.error(`[${context}] ${message}`);
  }

  warn(message: string, context: string) {
    console.warn(`[${context}] ${message}`);
  }
}
