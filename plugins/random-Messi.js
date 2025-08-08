import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const res = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/Messi.json');
    const images = res.data;
    const url = images[Math.floor(Math.random() * images.length)];

    let caption = `
*⌯⸼ مـےـرحـبـاً ⚽️، هـذه صـورة لـلمـعـزة 🐐 مـيـسـي!*
*⇇ لا تـنـسـى تـقـول : مااااااء 🔥😂*
`.trim();

    await conn.sendFile(m.chat, url, 'messi.jpg', caption, m, false, {
      buttons: [
        { buttonId: `${usedPrefix}${command}`, buttonText: { displayText: '⚽️ صورة تانية' }, type: 1 }
      ],
      headerType: 4
    });

  } catch (e) {
    console.error(e);
    m.reply('❌ حصل خطأ في جلب صورة ميسي، حاول مرة أخرى لاحقاً.');
  }
};

handler.help = ['messi'];
handler.tags = ['internet'];
handler.command = /^(ميسي|ماااااء|المعزه)$/i;

export default handler;