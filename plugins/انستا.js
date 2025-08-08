import fetch from 'node-fetch';
import axios from 'axios';
import { instagramdl } from '@bochilteam/scraper';
import { fileTypeFromBuffer } from 'file-type';

const userRequests = {};

const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) {
    throw `*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
*❐┃اسـتـخـدام خـاطـئ┃🛑❯*
*『حـط الامـر و رابـط فـيـديـو/صـوره/ريـل حـق الإنـسـتـا』*
*↞┇ مثال ↞ ${usedPrefix + command} https://www.instagram.com/reel/C4BZLtmrQPm/?igsh=cmplZHR6NjJhNjc5*
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
© By Steven`;
  }

  if (userRequests[m.sender]) {
    return await conn.reply(m.chat, `*❮ ⏳ ┇ يـجـب انـتـظـار تـنـزيـل الـطـلـب الـسـابـق ┇ @${m.sender.split('@')[0]} ❯*`, m);
  }

  userRequests[m.sender] = true;
  await m.react('🕖');

  try {
    const downloadAttempts = [
      async () => {
        const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${args[0]}`);
        const data = await res.json();
        const fileType = data.data[0].url.includes('.webp') ? 'image' : 'video';
        return {
          url: data.data[0].url,
          type: fileType,
          caption: fileType === 'image'
            ? '*❮ ✅ ┇ تـم تـحـمـيـل الـصـورة ❯*'
            : '*❮ ✅ ┇ تـم تـحـمـيـل الـفـيـديـو ❯*',
        };
      },
      async () => {
        const res = await fetch(`${info.fgmods.url}/downloader/igdl?url=${args[0]}&apikey=${info.fgmods.key}`);
        const data = await res.json();
        const result = data.result[0];
        const fileType = result.url.endsWith('.jpg') || result.url.endsWith('.png') ? 'image' : 'video';
        return {
          url: result.url,
          type: fileType,
          caption: fileType === 'image'
            ? '*❮ ✅ ┇ تـم تـحـمـيـل الـصـورة ❯*'
            : '*❮ ✅ ┇ تـم تـحـمـيـل الـفـيـديـو ❯*',
        };
      },
      async () => {
        const apiUrl = `${info.apis}/download/instagram?url=${encodeURIComponent(args[0])}`;
        const apiResponse = await fetch(apiUrl);
        const delius = await apiResponse.json();
        return {
          url: delius.data[0].url,
          type: delius.data[0].type,
          caption: delius.data[0].type === 'image'
            ? '*❮ ✅ ┇ تـم تـحـمـيـل الـصـورة ❯*'
            : '*❮ ✅ ┇ تـم تـحـمـيـل الـفـيـديـو ❯*',
        };
      },
      async () => {
        const resultssss = await instagramdl(args[0]);
        const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
        const txt4 = `_${shortUrl3}_`;
        return {
          url: resultssss[0].url,
          type: resultssss[0].url.endsWith('.mp4') ? 'video' : 'image',
          caption: txt4,
        };
      },
    ];

    let fileData = null;

    for (const attempt of downloadAttempts) {
      try {
        fileData = await attempt();
        if (fileData) break;
      } catch (err) {
        console.error(`محاولة فاشلة: ${err.message}`);
        continue;
      }
    }

    if (!fileData) throw new Error('*❮ ❌ ┇ لـم يـتـم الـعـثـور عـلـى أي رابـط صـالـح ❯*');

    const fileName = fileData.type === 'image' ? 'instagram.jpg' : 'instagram.mp4';

    await conn.sendFile(m.chat, fileData.url, fileName, fileData.caption, m);
    await m.react('✅');

  } catch (e) {
    await m.react('❌');
    console.error('*❮ ❌ ┇ خـطـأ فـي الـتـنـزيـل ❯*\n', e);
    throw `*❮ ❌ ┇ حـدث خـطـأ ┇ ${e.message} ❯*`;
  } finally {
    delete userRequests[m.sender];
  }
};

handler.help = ['انستا'];
handler.tags = ['تحميل'];
handler.command = /^(instadl|instagramdl|instagram|igdl|ig|انستا|انستغرام)$/i;
handler.limit = 1;
handler.register = true;

export default handler;