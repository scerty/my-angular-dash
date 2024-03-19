// puppeteer.service.ts

import { Injectable } from '@angular/core';
import * as puppeteer from 'puppeteer';

@Injectable({
  providedIn: 'root'
})
export class PuppeteerService {

  async takeScreenshot(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto(url);
      await page.screenshot({ path: 'screenshot.png' });
    } catch (error) {
      console.error('Error during Puppeteer operation:', error);
    } finally {
      await browser.close();
    }
  }
}
