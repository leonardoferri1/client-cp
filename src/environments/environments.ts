import { ConfigService } from '../app/services/config.service';

export const environment = () => {
  const env: any = { ...new ConfigService() };
  const browserWindow: any = window || {};
  const browserWindowEnv: any = browserWindow['appConfig'] || {};

  Object.entries(browserWindowEnv).forEach(([key, value]) => {
    env[key] = value;
  });

  return env;
};
