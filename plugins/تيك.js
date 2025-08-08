import axios from 'axios';
import cheerio from 'cheerio';

const ttsave = {
  download: async (url) => {
    const apiUrl = 'https://ttsave.app/download';
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
      'Referer': 'https://ttsave.app/id'
    };

    const data = { query: url, language_id: "2" };

    try {
      const response = await axios.post(apiUrl, data, { headers });
      const html = response.data;
      return await ttsave.extract(html);
    } catch (error) {
      return null;
    }
  },

  extract: async (html) => {
    const $ = cheerio.load(html);
    return {
      username: $('h2.font-extrabold').text().trim(),
      userHandle: $('a[title]').text().trim(),
      description: $('p.oneliner').text().trim(),
      downloadLinks: {
        video: $('a[type="no-watermark"]').attr('href') || $('a[type="watermark"]').attr('href'),
        image: $('a[type="cover"]').attr('href'),
        audio: $('a[type="audio"]').attr('href')
      }
    };
  }
};

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('`فـيـن الـلـيـنـك يـسـطـا` ☘️\n\n> *◐  مـثـال :*\n*.تيك* https://vt.tiktok.com/ZShYcGk31/');

  m.reply('`❲ 𓆩... وي̣̇ــــ͟͞⚡͟͞ـ͟͞ـ̣̇ـــت ...𓆪 ❳`');
  const result = await ttsave.download(text);
  if (!result) return m.react('❌');

  if (result.downloadLinks.video) {
    await conn.sendMessage(m.chat, {
      video: { url: result.downloadLinks.video }
    });
  } else if (result.downloadLinks.image) {
    await conn.sendMessage(m.chat, {
      image: { url: result.downloadLinks.image }
    });
  } else {
    return m.react('❌');
  }

  if (result.downloadLinks.audio) {
    await conn.sendMessage(m.chat, {
      audio: { url: result.downloadLinks.audio },
      mimetype: 'audio/mp4'
    });
  }
};

handler.help = ['tt', 'tiktok', 'ttdl', 'tiktokdl'];
handler.tags = ['التنزيل']
handler.command = ['تيك'];

export default handler;