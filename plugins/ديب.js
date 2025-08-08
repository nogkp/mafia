// كود ذكاء اصطناعي ديب سيك 🇵🇸
// Channel WhatsApp>>> https://whatsapp.com/channel/0029Vb0WYOu2f3EAb74gf02h
// Channel Telegram>>> https://t.me/MoriDev1

// By Z4cK-Dev ⚡


import fetch from 'node-fetch';
import pkg from 'baileys-pro';
const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn, text }) => {
  if (!text) {
    const message = `*❐═━━━═╊⊰🤖⊱╉═━━━═❐*
*❐┃ هـذا أمـر ذكـاء اصـطـنـاعـي┃🛑❯*

*↞┇ مثال ↞ .ديب من هو آخر رسول؟*
*❐═━━━═╊⊰🤖⊱╉═━━━═❐*
> *𒆜 𓆩𝐌𝐀𝐅𝐈𝐀- 𝐁𝐎𝐓𓆪-MD 𒆜*`;

    await sendInteractiveMessage(m, conn, message);
    return;
  }

  try {
    const apiURL = `https://bk9.fun/ai/deepseek-r1?q=${encodeURIComponent(text)}&lc=ar`;
    const response = await fetch(apiURL);
    const rawResponse = await response.text();

    console.log('Raw API Response:', rawResponse);

    try {
      const data = JSON.parse(rawResponse);
      console.log('Parsed API Response:', data);

      if (data && data.BK9.content) {
  await sendInteractiveMessage(m, conn, data.BK9.content);
} else {
  throw new Error('الرد من الـ API لا يحتوي على نتيجة.');
}
    } catch (jsonError) {
      console.error('JSON Parse Error:', jsonError);
      conn.reply(m.chat, 'حدث خطأ أثناء قراءة الرد من الخدمة.', m);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    conn.reply(m.chat, `حدث خطأ أثناء الاتصال بالخدمة. التفاصيل: ${error.message}`, m);
  }
};

async function sendInteractiveMessage(m, conn, text) {
  const imageUrl = 'https://files.catbox.moe/09sf67.jpg';

  let media = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

  let message = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { title: `𝑩𝑶𝑻-𝑴𝑨𝑭𝑰𝑨` },
          body: {
            text: text, // يتم عرض رد الذكاء الاصطناعي فقط
            subtitle: "Steven AI",
          },
          header: { hasMediaAttachment: true, ...media },
          contextInfo: {
            isForwarded: false,
          },
          nativeFlowMessage: {
            buttons: [
              {  
                name: "cta_url",  
                buttonParamsJson: JSON.stringify({  
                  display_text: "قــنــاتــنــا 🔰",  
                  url: "https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n",  
                  merchant_url: "https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n"  
                })  
              }
            ]
          }
        }
      }
    }
  };

  await conn.relayMessage(m.chat, message, {});
}

handler.help = ['M O R I'];
handler.tags = ['DeepAi'];
handler.command = /^(ديب_سيك|ديب|ديب-سيك)$/i;

export default handler;