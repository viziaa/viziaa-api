import puppeteer from "puppeteer";

export async function generatePdfFromUrl(url: string, token: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setCookie({
    name: "sb-session",
    value: token,
    domain: new URL(url).hostname,
    httpOnly: true,
  });

  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("#cv-root", { timeout: 10000 });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
}
