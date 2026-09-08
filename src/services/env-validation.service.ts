import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { REQUIRED_DB_ENV_VARS, INSECURE_DEFAULTS } from '../utils/constants';

@Injectable()
export class EnvValidationService implements OnModuleInit {
  private readonly logger = new Logger(EnvValidationService.name);

  private checkRequired(keys: readonly string[], label: string): void {
    const missing = keys.filter(
      (key) => !process.env[key] || process.env[key]!.trim() === '',
    );
    if (missing.length > 0) {
      this.logger.warn(
        `Missing required ${label} environment variables: ${missing.join(
          ', ',
        )}. ` +
          `The application may not work correctly. ` +
          `See .env.example for the full list of variables.`,
      );
    } else {
      this.logger.log(`All required ${label} environment variables are set.`);
    }
  }

  private warnOnInsecureDefaults(): void {
    for (const { key, insecureValue, message } of INSECURE_DEFAULTS) {
      const value = process.env[key];
      if (value && value === insecureValue) {
        this.logger.warn(`${message}`);
      }
    }
  }

  onModuleInit(): void {
    this.checkRequired(REQUIRED_DB_ENV_VARS, 'database');
    this.checkRequired(
      ['JWT_SECRET', 'AUTH_USERNAME', 'AUTH_PASSWORD'],
      'auth',
    );
    this.warnOnInsecureDefaults();
  }
}
