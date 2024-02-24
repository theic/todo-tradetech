import { commonContainer } from './container';
import { Application } from './Application';

export async function bootstrap() {
  try {
    const app = new Application(commonContainer);
    const expressApp = app.build();
    expressApp.listen(3000, () => {
      console.log(`Server running in ${app.nodeEnv} mode on port 3000`);
    });
  } catch (error) {
    console.error('Error starting the application', error);
  }
}
