const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const LINKEDIN_URL = "https://www.linkedin.com/feed/";

const delayer = (time) => new Promise((resolve) => setTimeout(resolve, time));

export async function handlePuppeteerTask() {
    puppeteer.use(StealthPlugin());

    console.log("Function is called");
    
    const userDataDir = `./user_data_${process.env.ACCOUNT}`;
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: userDataDir
    });
    
    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 760,
      deviceScaleFactor: 1,
    });

    await page.goto(LINKEDIN_URL);

    let title = await page.title();

    if (!title.includes('Feed | LinkedIn')) {
      await page.type('input[name="session_key"]', process.env.LINKEDIN_USERNAME_PROD);
      await page.type('input[name="session_password"]', process.env.LINKEDIN_PASSWORD_PROD);
  
      await page.waitForSelector('button[type="submit"]', {
        timeout: 10000,
      });
      await page.click('button[type="submit"]');
  
      await delayer(5000);
  
      title = await page.title();
      console.log(title);
      await delayer(2000);
  
      let isCaptcha = await page.$('iframe#captcha-internal') !== null;
      if (isCaptcha) {
        console.log('CAPTCHA detected');
        try {
          await solveCapcha(page);
        } catch (error) {
          console.error("Capcha solving error:", error);
          await delayer(3000000);
        }
      }
    }
    
    await browser.close();
}


