const { firefox } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const browser = await firefox.launch();
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0'
    });
    
    const page = await context.newPage();
    
    console.log('Navigating to Xiaomi with Firefox engine...');
    await page.goto('https://www.mi.com/global/', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait a bit for JS to execute
    await page.waitForTimeout(5000);

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

    const mdContent = '# Xiaomi Site Scraping (Playwright Firefox)\n\n' +
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
