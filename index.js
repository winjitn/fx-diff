const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/api/fx", async (req, res) => {
    console.log("starting query");

    const result = { krungsri: {}, superr: {}, bbl: {}, scb: {} };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.superrichthailand.com/#!/en/exchange", {
        waitUntil: "networkidle0"
    });

    const superr = await page.content();

    var data1 = cheerio.load(superr)("tbody");

    result.superr.USD = data1.get(
        1
    ).children[1].children[7].children[0].children[0].children[0].children[0].data;
    result.superr.JPY = data1.get(
        6
    ).children[1].children[7].children[0].children[0].children[0].children[0].data;
    result.superr.KRW = data1.get(
        15
    ).children[1].children[7].children[0].children[0].children[0].children[0].data;

    const krungsri = await axios.get(
        "https://www.krungsri.com/bank/en/Other/ExchangeRate/Todayrates.html"
    );

    await page.goto(
        "https://www.bangkokbank.com/en/Personal/Other-Services/View-Rates/Foreign-Exchange-Rates",
        {
            waitUntil: "networkidle0"
        }
    );

    const bbl = await page.content();
    var data = cheerio.load(bbl)("tbody");

    result.bbl.USD = data
        .get(0)
        .children[2].children[3].children[0].data.trim();
    result.bbl.JPY = data
        .get(0)
        .children[5].children[3].children[0].data.trim();
    result.bbl.KRW = data
        .get(0)
        .children[14].children[3].children[0].data.trim();

    await page.goto(
        "https://www.scb.co.th/en/personal-banking/foreign-exchange-rates.html",
        {
            waitUntil: "networkidle0"
        }
    );
    const scb = await page.content();
    var data2 = cheerio.load(scb)(".table-rate");

    result.scb.USD = data2.get(
        0
    ).children[1].children[3].children[5].children[0].data;
    result.scb.JPY = data2.get(
        0
    ).children[1].children[8].children[5].children[0].data;
    result.scb.KRW = data2.get(
        0
    ).children[1].children[11].children[5].children[0].data;

    data = cheerio.load(krungsri.data)("tbody tr");
    result.krungsri.USD = data.get(3).children[5].children[0].data;
    result.krungsri.JPY = data.get(6).children[5].children[0].data;
    result.krungsri.KRW = data.get(17).children[5].children[0].data;

    res.send(result);
});

app.listen(PORT, () => console.log("Server up"));
