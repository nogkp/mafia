import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const res = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/CristianoRonaldo.json');
    const images = res.data;
    const url = images[Math.floor(Math.random() * images.length)];

    let caption = `
*⌯⸼ شـوف الـعـم 👑 رونـالـدو 😎*
*⇇ قـول بـصـوت عـالـي: siiUUU 🔥⚽*
`.trim();

    await conn.sendFile(m.chat, url, 'ronaldo.jpg', caption, m, false, {
      buttons: [
        { buttonId: `${usedPrefix}${command}`, buttonText: { displayText: '⚽️ صورة تانية' }, type: 1 }
      ],
      headerType: 4
    });

  } catch (e) {
    console.error(e);
    m.reply('❌ حصل خطأ في جلب صورة رونالدو، حاول مرة تانية.');
  }
};

handler.help = ['cristianoronaldo', 'cr7'];
handler.tags = ['internet'];
handler.command = /^(الدون|رونالدو|cr7|عمك)$/i;

export default handler;