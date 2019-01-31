const puppeteer = require("puppeteer");

async function scrape(place) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const params = new URLSearchParams();
  params.set("q", `tourist attractions in ${place}`);
  await page.goto(`https://www.google.com/search?${params.toString()}`);

  const data = await page.evaluate(evaluator);

  await browser.close();
  return data;
}

function evaluator() {
  const places = document.querySelectorAll(
    ".gws-trips__tile-row table tbody tr td"
  );

  return [...places].map(p => {
    const heading = p.querySelector('[role="heading"]');
    const title = heading.textContent.trim();
    const linkParam = new URLSearchParams([["q", title]]);
    return {
      title,
      summary: heading.nextElementSibling.textContent.trim(),
      link: `https://google.com/search?${linkParam.toString()}`
    };
  });
}

module.exports = scrape;
