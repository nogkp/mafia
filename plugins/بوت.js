import { prepareWAMessageMedia, generateWAMessageFromContent } from 'baileys-pro';

const handler = async (m, { conn }) => {
    const imageUrl = "https://files.catbox.moe/2odzkn.jpg"; // رابط الصورة المصغرة
    const link1 = "https://wa.me/201208076133"; // الرابط الأول (اتصال مع المطور)
    const link2 = "https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n"; // الرابط الثاني (القناة)

    // تجهيز الصورة المصغرة
    const media = await prepareWAMessageMedia(
        { image: { url: imageUrl } },
        { upload: conn.waUploadToServer }
    );

    // إنشاء الرسالة التفاعلية
    const interactiveMessage = {
        body: { text: "مـرحـبـا اسـمـي 𝐌𝐀𝐅𝐈𝐀 الاذاعـه اسـتـخـدم امـر (.اوامـر) لطلب القائمة" },
        footer: { text: "｢♡┆𝑀𝐴𝐹𝐼𝐴┆♡｣" },
        header: { 
            title: "❪🐣┇𝑀𝐴𝐹𝐼𝐴┇🎤❫", 
            hasMediaAttachment: true, 
            imageMessage: media.imageMessage 
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "｢🍷┊لـلـمـطـور┊🍷｣",
                        url: link1
                    })
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "｢🍷┊القناة┊🍷｣",
                        url: link2
                    })
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "⌈🚀╎اوامر╎🚀⌋",
                        id: ".اوامر"
                    })
                }
            ]
        }
    };

    // إرسال الرسالة
    let msg = generateWAMessageFromContent(
        m.chat,
        { viewOnceMessage: { message: { interactiveMessage } } },
        { userJid: conn.user.jid, quoted: m }
    );

    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = /^بوت$/i; // تشغيل الكود عند كتابة ".بوت"

export default handler;