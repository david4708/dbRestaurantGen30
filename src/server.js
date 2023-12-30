import app from './app.js';
import { initModel } from './config/database/associations.js';
import { authenticate, syncUp } from './config/database/database.js';

import { envs } from './config/enviroment/enviroment.js';

async function main() {
  try {
    await authenticate();
    initModel()
    await syncUp();
  } catch (error) {
    console.log(error);
  }
}
main();

app.listen(envs.PORT, () => {
  console.log(`server runing on port ${envs.PORT} ✔`);
});
