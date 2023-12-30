import { Sequelize } from 'sequelize';
import { envs } from '../enviroment/enviroment.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export async function authenticate() {
  try {
    /* `await sequelize.authenticate()` is a function call that authenticates the connection to the
database using the Sequelize library. It waits for the authentication process to complete before
moving on to the next line of code. */
    await sequelize.authenticate();

    console.log('conection has been stablished successfully👍 ');
  } catch (error) {
    console.error(error);
  }
}

export async function syncUp() {
  try {
    await sequelize.sync();
    console.log('conection has been synced successfully 😃');
  } catch (error) {
    console.error(error);
  }
}
