
// تم التعديل على الكود بناءً على طلبك: 
// ✅ إضافة قسم الأعضاء (.ق18)
// ✅ إضافة قسم المعلومات (.ق20)
// ✅ استبدال رابط الصورة القديمة بالجديدة

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from 'baileys-pro';
const { generateWAMessageFromContent, prepareWAMessageMedia } = pkg;

const handler = async (m, { conn }) => {
  try {
    let d = new Date(Date.now() + 3600000);
    let uptime = clockString(process.uptime() * 1000);
    let user = global.db.data.users[m.sender] || {};
    let name = conn.getName(m.sender);
    let { role, level } = user;
    let mentionId = m.key.participant || m.key.remoteJid;

    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    await conn.sendMessage(m.chat, { react: { text: '🎶', key: m.key } });

    // ✅ تغيير رابط الصورة الجديدة
    const Elsony = 'https://files.catbox.moe/ij446p.jpg';
    const media = await prepareWAMessageMedia({ image: { url: Elsony } }, { upload: conn.waUploadToServer });

    let message = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { title: "gataVidMenu" },
            body: {
              text: `╭────────────── ⪩
┃  🎤✨ ســـــــلام عــلــيــكــم يــا مــغــنــي 🎶💙
╰────────────── ⪨
╭────────── ⪩
┃ 🎼✨ أهـــــلًا وســــهـــلًا بــــك يــا:
┃ ⌜ @${mentionId.split('@')[0]} ⌟
╰────────── ⪨
╭═══════ ⌈ 🎶 مــعــلــومــات الــبــوت 🎤 ⌋ ═══════╮
┃ 🩵❥ *اســــــم الــــبــــوت*: 『 𝑀𝐴𝐹𝐼𝐴』
┃ 💫❥ *الــــمــــطــــور*: 『 𝐴𝐻𝑀𝐴𝐷』
┃ 🎙❥ *رقــــم الــــمــــطــــور*: 『 wa.me/201208076133 📞』
╭═══════ ⌈ 🎤 مــعــلــومــاتــك 🎼 ⌋ ═══════╮
┃ 🍭❥ *مــســتــواك*: 『 ${level} 🎵 』
┃ 💰❥ *فــلــوســك*: 『 ${user.money || 0} 🪙 』
┃ 🎙❥ *رتــبــتــك*: 『 ${role} 🎼 』
┃ ❤️❥ *صــحــتــك*: 『 ${user.health || 100} / 1000 🚑』
╭── 🎧🎶 ⌈ 𝑵𝑶𝑻𝑬 ⌋ 🎶🎧 ──╮
┃ *🎤 اضغط الأزرار لعرض القائمة 🎼*
┃ *💬 للشكاوى أو الاقتراحات استخدم: .ابلاغ 🎶*
┃ *🎶 حافظ على الأجواء الموسيقية عند ذكر البوت! 🎵*
╰── 🎼💙 ⌈ 𝐌𝐀𝐅𝐈𝐀 🎤 ⌋ 💙🎼 ──╯`,
              subtitle: "Elsony"
            },
            header: { hasMediaAttachment: true, ...media },
            contextInfo: { mentionedJid: [m.sender], isForwarded: false },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: '⌈🍭┊اوامر┊🍬⌋',
                    sections: [
                      {
                        title: '❪🐣┊مـهـام_الـبـوت┊🍡❫',
                        highlight_label: '𝑴𝑨𝑭𝑰𝑨',
                        rows: [
                          { header: '👑┊القـ👑ـسـم الأول', title: '🍫┊「قـسـم_الألـعـاب」🍥', id: '.ق1' },
                          { header: '🐦‍🔥┊القـ🐦‍🔥ـسـم الثاني', title: '🍨┊「قـسـم_الـمـشـرفـيـن」🍨', id: '.ق3' },
                          { header: '👑┊القـ👑ـسـم الثالث', title: '🍨┊「قـسـم_الادوات」🍬', id: '.ق4' },
                          { header: '🐥┊القـ🐥ـسم الرابع', title: '🍬┊「قـسـم_الـتـرفـيـه」🍨', id: '.ق14' },
                          { header: '🛡┊القـ🛡ـسـم الخامس', title: '🍬┊「قـسـم_الـتـحـمـيـل」🍨', id: '.ق5' },
                          { header: '🕹┊القـ🕹ـسـم السادس', title: '🍬┊「قـسـم_الـبـنـك」🍨', id: '.ق6' },
                          { header: '🌀┊القـ🌀ـسـم السابع', title: '🍬┊「قـسـم_الــAI」🍨', id: '.ق7' },
                          { header: '🤖┊القـ🤖ـسـم الثامن', title: '🍬┊「قـسـم_الـتـسـلـيـه」🍨', id: '.ق9' },
                          { header: '🕋┊القـ📿ـسـم التاسع', title: '🍬┊「قــســم_الـديـن」🍨', id: '.ق10' },
                          { header: '🖌️┊القـ🖌️ـسـم العاشر', title: '🍬┊「قــســم_الـزخــارف」🍨', id: '.ق11' },
                          { header: '⚔️┊القـ⚜️ـسـم الـحادي عـشر', title: '🍬┊「قــســم_الـنـقـابـات」🍨', id: '.ق12' },                            
   { header: '📷┊القـ🎥ـسـم الـثانـي عـشر', title: '🍬┊「قــســم_الـفديـوهـات」🍨', id: '.ق16' },                       
                          { header: '🗾┊القـ🌅ـسـم الـثالـث عـشر', title: '🍬┊「قــســم_الـصــور」🍨', id: '.ق13' },

{ header: '🎨┊القـ🎨ـسـم الـرابـع عـشر', title: '🍬┊「قـسـم_الشعـارات」🍨', id: '.شعارات' },
                    { header: '🎮┊القـ🎮ـسـم الـخامـس عـشر', title: '🍬┊「قـسـم_الـجـيـمز」🍨', id: '.ق15' },
                          { header: '👨🏻‍💻┊القـ👨🏻‍💻ـسـم الـسادس عـشر', title: '🍬┊「قائمتي」🍨', id: '.قائمتي' },
                          { header: '🧑‍🤝‍🧑┊القـ🧑‍🤝‍🧑ـسـم الـسابـع عـشر', title: '🍬┊「قـسـم_الأعــضــاء」🍨', id: '.ق18' },
                          { header: '📚┊القـ📚ـسـم الـثامـن عـشر', title: '🍬┊「قـسـم_المـعـلـومـات」🍨', id: '.ق20' },
                          { header: '📜┊القـ📜ـسـم الأخير', title: '🍬┊「 القوانين 」🍨', id: '.القواعد' }
                        ]
                      }
                    ]
                  })
                },
                { name: "cta_url", buttonParamsJson: '{"display_text":"⌈📩╎شات البوت╎📩⌋","url":"https://wa.me/+201558274316"}' },
                { name: "quick_reply", buttonParamsJson: '{"display_text":"⌈🌟╎تقييم╎🌟⌋","id":".تقيم"}' },
                { name: "cta_url", buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الـمـطـور╎📲⌋","url":"https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n"}' },
                { name: "quick_reply", buttonParamsJson: '{"display_text":"⌈🚀╎المطور╎🚀⌋","id":".المطور"}' },
                { name: "quick_reply", buttonParamsJson: '{"display_text":"⌈💎╎الدعم╎💎⌋","id":".الدعم"}' }
              ]
            }
          }
        }
      }
    };

    await conn.relayMessage(m.chat, message, {});
  } catch (err) {
    console.error(err);
    await conn.sendMessage(m.chat, { text: '❌ حدث خطأ أثناء تنفيذ الأمر.' }, { quoted: m });
  }
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['menu', 'مهام', 'اوامر', 'الاوامر', 'قائمة', 'القائمة'];

export default handler;