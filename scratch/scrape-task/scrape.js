const { chromium } = require('playwright');
const { stealthSync } = require('playwright-stealth');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    // Apply stealth
    const stealth = require('playwright-stealth');
    // await stealth(page); // Some versions use this
    
    console.log('Navigating to Xiaomi with Stealth...');
    // Try https://www.mi.com/ which usually redirects to regional
    await page.goto('https://www.mi.com/', { waitUntil: 'networkidle' });

    console.log('Current URL:', page.url());
    console.log('Extracting content...');
    const html = await page.content();

    const styles = await page.evaluate(async () => {
      let allCss = '';
      const styleTags = document.querySelectorAll('style');
      styleTags.forEach(tag => {
        allCss += tag.textContent + '\n';
      });

      const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
      for (const link of linkTags) {
        try {
          const response = await fetch(link.href);
          const css = await response.text();
          allCss += `/* Source: ${link.href} */\n${css}\n`;
        } catch (e) {
          allCss += `/* Failed to fetch: ${link.href} */\n`;
        }
      }
      return allCss;
    });

    const mdContent = '# Xiaomi Site Scraping\n\n' +
      '## URL: ' + page.url() + '\n\n' +
      '## HTML\n' +
      '```html\n' + html + '\n```\n\n' +
      '## CSS\n' +
      '```css\n' + styles + '\n```\n';

    const outputPath = path.join(__dirname, 'xiaomi_site.md');
    fs.writeFileSync(outputPath, mdContent);
    console.log('Saved to ' + outputPath);

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
