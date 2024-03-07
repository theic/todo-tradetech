import { container } from './container';
import { Application } from './Application';
import { getRouteInfo } from "inversify-express-utils";
import * as prettyjson from "prettyjson";

export async function bootstrap() {
  try {
    const app = container.get<Application>(Application);
    await app.setup(container).start();
    const routeInfo = getRouteInfo(container);
    console.log(prettyjson.render({ routes: routeInfo }));
  } catch (error) {
    console.error('Error starting the application', error);
    process.exit(1);
  }
}
