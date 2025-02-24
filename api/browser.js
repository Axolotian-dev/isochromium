import chromium from 'chrome-aws-lambda';

export default async function handler(req, res) {
  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();

    res.status(200).json({ title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
