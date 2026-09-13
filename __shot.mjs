import { chromium } from "@playwright/test";

const browser = await chromium.launch();
for (const [theme, name] of [["light", "learning-light.png"], ["dark", "learning-dark.png"]]) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("theme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/en/learning");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-renanrambul/da4f9c73-ecdc-499c-ab74-f8222b686b4a/scratchpad/${name}`, fullPage: true });
  await ctx.close();
}
await browser.close();
console.log("ok");
