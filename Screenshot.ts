import { Page } from '@playwright/test';
import fs from 'fs';
import Logger from './Logger';

/**
 * Author Name : Abesh Bhattacharya
 * Method Name : takeScreenshot
 * Description : Captures a full-page screenshot and stores it in the screenshots directory
 * Parameters : page:Page, screenshotName:string
 * Return Type : Promise<string>
 */
export async function takeScreenshot(
   page: Page,
   screenshotName: string
): Promise<string> {
   try {
      Logger.info(
         `Capturing screenshot : ${screenshotName}`
      );

      const screenshotDirectory: string =
         'screenshots';

      if (
         !fs.existsSync(
            screenshotDirectory
         )
      ) {
         Logger.info(
            `Creating directory : ${screenshotDirectory}`
         );

         fs.mkdirSync(
            screenshotDirectory
         );

         Logger.info(
            `Directory created successfully : ${screenshotDirectory}`
         );
      }

      const cleanName: string =
         screenshotName.replace(
            /[^a-zA-Z0-9]/g,
            '_'
         );

      const screenshotPath: string =
         `${screenshotDirectory}/${cleanName}_${Date.now()}.png`;

      await page.screenshot({
         path: screenshotPath,
         fullPage: true
      });

      Logger.info(
         `Screenshot captured : ${screenshotPath}`
      );

      return screenshotPath;
   }
   catch (error) {
      Logger.error(
         `Failed to capture screenshot : ${error}`
      );

      throw error;
   }
}