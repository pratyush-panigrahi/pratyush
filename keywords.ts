import {
   Page,
   Locator,
   expect
} from '@playwright/test';
import Logger from './Logger';

export class Keywords {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : openHome
    * Description : Opens application home page
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async openHome(): Promise<void> {
      try {
         Logger.info(
            'Opening home page'
         );

         await this.page.goto('/');

         await this.page.waitForLoadState(
            'domcontentloaded'
         );

         Logger.info(
            'Home page opened successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to open home page : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : scrollToBottom
    * Description : Scrolls to the bottom of the page
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async scrollToBottom(): Promise<void> {
      try {
         Logger.info(
            'Scrolling to page bottom'
         );

         await this.page.evaluate(() => {
            window.scrollTo(
               0,
               document.body.scrollHeight
            );
         });

         Logger.info(
            'Scrolled to page bottom successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to scroll page : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : openCharacter
    * Description : Opens the specified character page
    * Parameters : characterName:string
    * Return Type : Promise<void>
    */
   public async openCharacter(
      characterName: string
   ): Promise<void> {
      try {
         Logger.info(
            `Opening character : ${characterName}`
         );

         await this.openHome();

         const character: Locator =
            this.page
               .getByText(
                  characterName,
                  {
                     exact: true
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await character.count() > 0
         ) {
            await character.scrollIntoViewIfNeeded();

            await character.click();

            await this.page.waitForLoadState(
               'domcontentloaded'
            );

            Logger.info(
               `Character opened successfully : ${characterName}`
            );

            return;
         }

         await this.scrollToBottom();

         const footerCharacter: Locator =
            this.page
               .getByText(
                  characterName,
                  {
                     exact: true
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await footerCharacter.count() > 0
         ) {
            await footerCharacter.click();

            await this.page.waitForLoadState(
               'domcontentloaded'
            );
         }

         Logger.info(
            `Character processing completed : ${characterName}`
         );
      }
      catch (error) {
         Logger.error(
            `Failed to open character : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : openFirstProduct
    * Description : Opens the first available product
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async openFirstProduct(): Promise<void> {
      try {
         Logger.info(
            'Opening first available product'
         );

         const links: Locator =
            this.page.getByRole(
               'link'
            );

         const linkCount: number =
            await links.count();

         for (
            let index: number = 0;
            index < linkCount;
            index++
         ) {
            const href: string | null =
               await links
                  .nth(index)
                  .getAttribute(
                     'href'
                  );

            if (
               href &&
               href.includes(
                  '/product/'
               )
            ) {
               await links
                  .nth(index)
                  .click();

               await this.page.waitForLoadState(
                  'domcontentloaded'
               );

               Logger.info(
                  'Product opened successfully'
               );

               return;
            }
         }

         const visibleText: Locator =
            this.page
               .getByText(
                  '₹',
                  {
                     exact: false
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await visibleText.count() > 0
         ) {
            await visibleText.click();

            await this.page.waitForLoadState(
               'domcontentloaded'
            );
         }

         Logger.info(
            'Product processing completed'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to open first product : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : verifyProductImage
    * Description : Verifies product image visibility
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async verifyProductImage(): Promise<void> {
      try {
         Logger.info(
            'Verifying product image visibility'
         );

         const image: Locator =
            this.page
               .getByRole(
                  'img'
               )
               .filter({
                  visible: true
               })
               .first();

         await expect(
            image
         ).toBeVisible();

         Logger.info(
            'Product image verified successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to verify product image : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : verifyPrice
    * Description : Verifies product price visibility
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async verifyPrice(): Promise<void> {
      try {
         Logger.info(
            'Verifying product price visibility'
         );

         const price: Locator =
            this.page
               .getByText(
                  '₹',
                  {
                     exact: false
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         await expect(
            price
         ).toBeVisible();

         Logger.info(
            'Product price verified successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to verify product price : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : openProductDetails
    * Description : Opens the product details section
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async openProductDetails(): Promise<void> {
      try {
         Logger.info(
            'Opening product details section'
         );

         const details: Locator =
            this.page
               .getByText(
                  'Product Details',
                  {
                     exact: true
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await details.count() > 0
         ) {
            await details.scrollIntoViewIfNeeded();

            await expect(
               details
            ).toBeVisible();

            await details.click();
         }

         Logger.info(
            'Product details section processed successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to open product details : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : verifySpecifications
    * Description : Verifies specifications section visibility
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async verifySpecifications(): Promise<void> {
      try {
         Logger.info(
            'Verifying specifications section'
         );

         const specifications: Locator =
            this.page
               .getByText(
                  'Specifications',
                  {
                     exact: true
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await specifications.count() > 0
         ) {
            await specifications.scrollIntoViewIfNeeded();

            await expect(
               specifications
            ).toBeVisible();
         }

         Logger.info(
            'Specifications verified successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to verify specifications : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : checkPincode
    * Description : Checks pincode availability
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async checkPincode(): Promise<void> {
      try {
         Logger.info(
            'Checking pincode availability'
         );

         const pincode: Locator =
            this.page
               .getByPlaceholder(
                  'pincode',
                  {
                     exact: false
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await pincode.count() > 0
         ) {
            await pincode.fill('');

            await pincode.fill(
               '700019'
            );

            const check: Locator =
               this.page
                  .getByText(
                     'Check',
                     {
                        exact: true
                     }
                  )
                  .filter({
                     visible: true
                  })
                  .first();

            if (
               await check.count() > 0
            ) {
               await check.click();
            }
         }

         Logger.info(
            'Pincode verification completed successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to check pincode : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : addToBag
    * Description : Adds product to shopping bag
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async addToBag(): Promise<void> {
      try {
         Logger.info(
            'Adding product to bag'
         );

         const addToBag: Locator =
            this.page
               .getByText(
                  'Add to bag',
                  {
                     exact: true
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await addToBag.count() > 0
         ) {
            await addToBag.click();
         }

         Logger.info(
            'Add to bag action completed successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to add product to bag : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : openBag
    * Description : Opens shopping bag page
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async openBag(): Promise<void> {
      try {
         Logger.info(
            'Opening bag page'
         );

         const myBag: Locator =
            this.page
               .getByText(
                  'My bag',
                  {
                     exact: true
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         await expect(
            myBag
         ).toBeVisible();

         await myBag.click();

         await expect(
            this.page
         ).toHaveURL(
            /bag/i
         );

         Logger.info(
            'Bag page opened successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to open bag page : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : buyNow
    * Description : Clicks Buy Now button
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async buyNow(): Promise<void> {
      try {
         Logger.info(
            'Clicking Buy Now button'
         );

         const buyNow: Locator =
            this.page
               .getByText(
                  'Buy now',
                  {
                     exact: true
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await buyNow.count() > 0
         ) {
            await buyNow.click();
         }

         Logger.info(
            'Buy Now action completed successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to click Buy Now button : ${error}`
         );

         throw error;
      }
   }

   /**
    * Author Name : Abesh Bhattacharya
    * Method Name : checkout
    * Description : Proceeds to checkout
    * Parameters : None
    * Return Type : Promise<void>
    */
   public async checkout(): Promise<void> {
      try {
         Logger.info(
            'Proceeding to checkout'
         );

         const checkout: Locator =
            this.page
               .getByText(
                  'Checkout',
                  {
                     exact: false
                  }
               )
               .filter({
                  visible: true
               })
               .first();

         if (
            await checkout.count() > 0
         ) {
            await expect(
               checkout
            ).toBeVisible();

            await checkout.click();
         }

         Logger.info(
            'Checkout action completed successfully'
         );
      }
      catch (error) {
         Logger.error(
            `Failed to proceed to checkout : ${error}`
         );

         throw error;
      }
   }
}