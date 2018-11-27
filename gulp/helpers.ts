/* tslint:disable:no-implicit-dependencies object-literal-sort-keys */
import { exec } from 'child_process';

interface IPRPLConfigBuild {
  name: string;
  browserCapabilities?: string[];
}

interface IPRPLConfig {
  entrypoint: string;
  builds: IPRPLConfigBuild[];
}

export class ConfigHelper {
  private readonly config: IPRPLConfig;

  constructor(entrypoint = 'index.html', builds: IPRPLConfigBuild[] = []) {
    this.config = { entrypoint, builds };
  }

  public createBuild(buildName: string, browsersList: string, browserCapabilities?: string[]) {
    return new Promise((resolve, reject) =>
      exec(`BUILD_NAME=${buildName} BROWSERSLIST="${browsersList}" npm run build:static`, (err) => {
        if (err) {
          reject(err);
        } else {
          this.config.builds.push({
            name: buildName,
            ...browserCapabilities ? { browserCapabilities } : {},
          });
          resolve();
        }
      }));
  }

  get output() {
    return `${JSON.stringify(this.config, null, 2)}\n`;
  }
}
