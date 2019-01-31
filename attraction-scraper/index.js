const app = require("express")();
const scraper = require("./scraper");

const PORT = 8889;

app.get("", async (req, res) => {
  const place = req.query.q;
  if (!place) return res.sendStatus(400);
  try {
    const response = await scraper(place);
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(response);
  } catch (e) {
    return res.sendStatus(501);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
