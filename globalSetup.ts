import fs from 'fs';
import Logger from './Logger';

/**
 * Author Name : Abesh Bhattacharya
 * Method Name : globalSetup
 * Description : Creates required framework directories before test execution
 * Parameters : None
 * Return Type : Promise<void>
 */
async function globalSetup(): Promise<void> {
   try {
      Logger.info(
         'Hamleys automation execution started'
      );

      const directories: string[] = [
         'screenshots',
         'logs'
      ];

      for (const directory of directories) {
         if (!fs.existsSync(directory)) {
            Logger.info(
               `Creating directory : ${directory}`
            );

            fs.mkdirSync(directory);

            Logger.info(
               `Directory created successfully : ${directory}`
            );
         }
      }

      Logger.info(
         'Required directories verified'
      );
   }
   catch (error) {
      Logger.error(
         `Failed during global setup execution : ${error}`
      );

      throw error;
   }
}

export default globalSetup;