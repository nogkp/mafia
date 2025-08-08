import axios from "axios";

import ytSearch from "yt-search";

let handler = async (m, { conn, text, botname }) => {

  if (!text) return m.reply("`تــحــب تــســمــع اي` 💋");

  await m.reply("`❲ 𓆩... وي̣̇ــــ͟͞⚡͟͞ـ͟͞ـ̣̇ـــت ...𓆪 ❳`");

  try {

    let search = await ytSearch(text);

    let video = search.videos[0];

    if (!video) return m.reply("`جــرب مره تــانـي` 🦆");

    let link = video.url;

    let apis = [

      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${link}`,

      `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${link}`

    ];

    for (const api of apis) {

      try {

        let { data } = await axios.get(api);

        if (data.status === 200 || data.success) {

          let audioUrl = data.result?.downloadUrl || data.url;

          let songData = {

            title: data.result?.title || video.title,

            artist: data.result?.author || video.author.name,

            thumbnail: data.result?.image || video.thumbnail,

            videoUrl: link

          };

          // Send metadata & thumbnail

          await conn.sendMessage(

            m.chat,

            {

              image: { url: songData.thumbnail },

              caption : ` ╭═════════════════

║ 🎶 *الــعــنــوان :* ${songData.title}

║ 🎤 *الــمــغــنــي :* ${songData.artist}

╰═════════════════

> *♔𓆩𝑴𝑨𝑭𝑰𝑨 𝑩𝑶𝑻𓆪♔ ︱ ♛𝑨𝑯𝑴𝑨𝑫♛ 🍨🫧*`

            },

            { quoted: m }

          );

          await m.reply("*ـ↺⟣┈┈┈┈┈  📀  ┈┈┈┈┈⟢↻ـ*\n> `يـتـم ارسـال الـصـوت ...`\n*ـ↺⟣┈┈┈┈┈  📀  ┈┈┈┈┈⟢↻ـ*");

          // Send as an audio file

          await conn.sendMessage(

            m.chat,

            {

              audio: { url: audioUrl },

              mimetype: "audio/mp4",

            },

            { quoted: m }

          );

          await m.reply("*ـ↺⟣┈┈┈┈┈  📁  ┈┈┈┈┈⟢↻ـ*\n> `يـتـم ارسـال مـلـف الـصـوت ...`\n*ـ↺⟣┈┈┈┈┈  📁  ┈┈┈┈┈⟢↻ـ*");

          // Send as a document file

          await conn.sendMessage(

            m.chat,

            {

              document: { url: audioUrl },

              mimetype: "audio/mp3",

              fileName: `${songData.title}.mp3`,

            },

            { quoted: m }

          );

          // Send success message

          await m.reply("*مـافـيـا بـوت فـي خـدمـتـك 💋*");

          return; // Stop execution if successful

        }

      } catch (e) {

        console.error(`API Error (${api}):`, e.message);

        continue; // Try next API if one fails

      }

    }

    // If all APIs fail

    return m.reply("⚠️ خطا في الاستجابه.");

  } catch (error) {

    return m.reply("❌ خطا في التنزيل\n" + error.message);

  }

};

handler.help = ["play"];

handler.tags = ["downloader"];

handler.command = /^اغنية|اغنيه$/i;

export default handler;