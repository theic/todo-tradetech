import { container } from './container';
import { Application } from './Application';

export async function bootstrap() {
  try {
    const app = container.get<Application>(Application);
    await app.setup(container).start();
  } catch (error) {
    console.error('Error starting the application', error);
    process.exit(1);
  }
}
