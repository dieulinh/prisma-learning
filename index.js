// index.js

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

app.get("/quotes", async (req, res)=> {
  const currentPage = req.query.page || 1;
  const listPerPage = 5;
  const offset = (currentPage -1 )*listPerPage;
  const allQuotes = await prisma.quote.findMany({
    include: { author: true },
    skip: offset,
    take: listPerPage
  })
  res.json({
    data: allQuotes,
    meta: {
      page: currentPage
    }
  })
})
