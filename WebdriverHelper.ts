import {
   Page,
   expect
} from '@playwright/test';
import Logger from './Logger';

export class WebdriverHelper {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : launchApplication
    * Description : Launches the Hamleys application and waits for page load
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async launchApplication(): Promise<void> {
      try {
         Logger.info(
            'Launching Hamleys website'
         );

         await this.page.goto('/');

         await this.page.waitForLoadState(
            'domcontentloaded'
         );

         Logger.info(
            'Hamleys website opened'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to launch application : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : navigateBack
    * Description : Navigates back to the previous page
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async navigateBack(): Promise<void> {
      try {
         Logger.info(
            'Navigating back'
         );

         await this.page.goBack();

         Logger.info(
            'Navigation completed successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to navigate back : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : refreshPage
    * Description : Refreshes the current page
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async refreshPage(): Promise<void> {
      try {
         Logger.info(
            'Refreshing browser'
         );

         await this.page.reload();

         await this.page.waitForLoadState(
            'domcontentloaded'
         );

         Logger.info(
            'Browser refreshed successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to refresh page : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : scrollDown
    * Description : Scrolls the page downward
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async scrollDown(): Promise<void> {
      try {
         Logger.info(
            'Scrolling down'
         );

         await this.page.mouse.wheel(
            0,
            800
         );

         Logger.info(
            'Scrolled down successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to scroll down : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : scrollUp
    * Description : Scrolls the page upward
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async scrollUp(): Promise<void> {
      try {
         Logger.info(
            'Scrolling up'
         );

         await this.page.mouse.wheel(
            0,
            -800
         );

         Logger.info(
            'Scrolled up successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to scroll up : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : verifyUrl
    * Description : Verifies the current URL against the expected URL pattern
    * Parameters : expectedUrl:RegExp
    * Return Type : Promise<void>
    */
   public async verifyUrl(
      expectedUrl: RegExp
   ): Promise<void> {
      try {
         Logger.info(
            `Verifying URL : ${expectedUrl}`
         );

         await expect(
            this.page
         ).toHaveURL(
            expectedUrl
         );

         Logger.info(
            'URL verified successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to verify URL : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : getCurrentUrl
    * Description : Retrieves the current browser URL
    * Parameters : None
    * Return Type : Promise<string>
    */
   public async getCurrentUrl(): Promise<string> {
      try {
         const currentUrl: string =
            this.page.url();

         Logger.info(
            `Current URL : ${currentUrl}`
         );

         return currentUrl;
      }
      catch (error) {
         Logger.error(
            `Failed to get current URL : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : waitForPageLoad
    * Description : Waits for page DOM content to load completely
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async waitForPageLoad(): Promise<void> {
      try {
         Logger.info(
            'Waiting for page load'
         );

         await this.page.waitForLoadState(
            'domcontentloaded'
         );

         Logger.info(
            'Page loaded successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed while waiting for page load : ${error}`
         );

         throw error;
      }
   }
}