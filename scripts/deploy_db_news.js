const { connection, News } = require("./src/models");
const PROGRAM_NEWS = require("./seed_program_news.js");

async function main() {
  console.log("Connecting to database...");
  await connection.authenticate();
  console.log("Connected successfully to database.");

  let inserted = 0;
  let updated = 0;

  for (const item of PROGRAM_NEWS) {
    const existing = await News.findOne({
      where: { id: item.id },
      paranoid: false
    });

    if (existing) {
      await existing.update({
        authorId: item.authorId,
        title: item.title,
        titleEn: item.titleEn,
        category: item.category,
        categoryEn: item.categoryEn,
        summary: item.summary,
        summaryEn: item.summaryEn,
        content: item.content,
        contentEn: item.contentEn,
        tags: item.tags,
        tagsEn: item.tagsEn,
        coverImage: item.coverImage,
        publishedAt: item.publishedAt,
        status: item.status
      });
      updated++;
      console.log(`Updated: ${item.title.slice(0, 40)}...`);
    } else {
      await News.create({
        id: item.id,
        authorId: item.authorId,
        title: item.title,
        titleEn: item.titleEn,
        category: item.category,
        categoryEn: item.categoryEn,
        summary: item.summary,
        summaryEn: item.summaryEn,
        content: item.content,
        contentEn: item.contentEn,
        tags: item.tags,
        tagsEn: item.tagsEn,
        coverImage: item.coverImage,
        publishedAt: item.publishedAt,
        status: item.status
      });
      inserted++;
      console.log(`Inserted: ${item.title.slice(0, 40)}...`);
    }
  }

  console.log(`\nDONE! Inserted: ${inserted}, Updated: ${updated}, Total: ${PROGRAM_NEWS.length}`);
  
  const allNews = await News.findAll({
    order: [["publishedAt", "DESC"]]
  });
  console.log(`Total active news in DB now: ${allNews.length}`);
  process.exit(0);
}

main().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
