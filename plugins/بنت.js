import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, author }) => {
  await conn.sendMessage(m.chat, {
    react: {
      text: '🔥',
      key: m.key,
    }
  });

  let res = await fetch('https://api.waifu.pics/sfw/waifu');
  if (!res.ok) throw await res.text();

  let json = await res.json();
  if (!json.url) throw '❌ لم أستطع جلب الصورة!';

  // ✅ نحمل الصورة كـ Buffer بدون تخزين مؤقت
  let waifu = await fetch(json.url);
  let buffer = await waifu.buffer();

  // ✅ نرسل الصورة من الذاكرة
  await conn.sendFile(m.chat, buffer, 'waifu.jpg', "𝑩𝑶𝑻-𝑴𝑨𝑭𝑰𝑨 | 🐼❤️*", m);

  // ✅ زر تكرار بعد الصورة
  await conn.sendMessage(m.chat, {
    text: 'اضغط علي الزر لي اعاده الامر',
    footer: author,
    buttons: [
      { buttonId: '.بنت', buttonText: { displayText: '🔄 التالي 🔄' }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m });
};

handler.help = ['بنت'];
handler.tags = ['anime'];
handler.command = /^(بنت)$/i;

export default handler;