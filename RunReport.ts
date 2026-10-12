import { exec } from 'child_process';
import Logger from './Logger';

/**
 * Author Name : Abesh Bhattacharya
 * Method Name : openPlaywrightReport
 * Description : Opens the Playwright HTML report after execution
 * Parameters : None
 * Return Type : void
 */
export function openPlaywrightReport(): void {
   try {
      Logger.info(
         'Opening Playwright HTML report'
      );

      exec(
         'npx playwright show-report',
         (
            error: Error | null
         ) => {
            if (error) {
               Logger.error(
                  `Unable to open report : ${error.message}`
               );

               return;
            }

            Logger.info(
               'Playwright HTML report opened'
            );
         }
      );
   }
   catch (error) {
      Logger.error(
         `Failed to execute report command : ${error}`
      );

      throw error;
   }
}