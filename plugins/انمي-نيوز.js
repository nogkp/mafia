const handler = async (m, {conn}) => {
  try {
    m.react("📰");
    
    const res = await fetch("https://the-end-api.vercel.app/home/sections/Search/api/anime/news");
    const {data} = await res.json();
    
    if (!data) throw new Error("لا توجد أخبار متاحة حالياً");

    let message = `
*〘 ━━━━━━ ✦ ━━━━━━ 〙*
       『 📰 𝗔𝗡𝗜𝗠𝗘 𝗡𝗘𝗪𝗦 』
*〘 ━━━━━━ ✦ ━━━━━━ 〙*\n\n`;

    for (const [animeName, newsItems] of Object.entries(data)) {
      message += `*🎌 ${animeName.trim()}*\n`;
      
      newsItems.forEach(news => {
        message += ` 
> ︱ 🆔 • *الـ اي دي :* ${news.id}
> ︱ 🍧 • *الـعـنـوان :* ${news.title}
> ︱ ♨️  • *الـتـاريـخ :* ${news.date}
> ︱ 👣  • *الـوصـف :* ${news.description}
> ︱ 🖼️  • *الـصـورة :* ${news.thumbnail}
> ︱ 🔗 • *الـلـيـنـك :* ${news.url}
${'═'.repeat(30)}\n`;
      });
    }

    message += `\n- *📊 الـنـتـيـجـة :* ${Object.values(data).flat().length} *خــبــر*`;
    message += `\n*⏱️ آخر مره حاجه نزلت كانت فتاريخ:* ${new Date().toLocaleString()}`;

    await conn.sendMessage(m.chat, {text: message}, {quoted: m});
    m.react("✅");

  } catch (error) {
    m.reply(`❌ خطأ: ${error.message}`);
    m.react("❌");
  }
};

handler.help = ['animenews'];
handler.tags = ['anime'];
handler.command = /^(اخبار-انمي|انمي-اخبار|انمي-نيوز)$/i;
export default handler;