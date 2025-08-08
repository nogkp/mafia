import axios from "axios";
import yts from "yt-search";

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply("🎵 *يرجى إدخال عنوان الأغنية أو رابط يوتيوب!*\n🔹 *مثال:* صوت عصام صاصا\n🔹 *أو:* صوت https://youtube.com/shorts/HN32b0wWohQ?si=4-aOVh2CBbHjYDpb");

    let videoUrl;
await m.react('🕓')
    // التحقق مما إذا كان النص هو رابط يوتيوب
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|v\/)|youtu\.be\/)([\w\-]+)/;
    const match = text.match(youtubeRegex);

    if (match) {
        videoUrl = `https://www.youtube.com/watch?v=${match[1]}`;
    } else {
        // البحث عن الفيديو عبر العنوان
        const searchResults = await yts(text);
        if (!searchResults.videos.length) {
            return m.reply("❌ *لم يتم العثور على الأغنية.*");
        }
        videoUrl = searchResults.videos[0].url;
    }

    try {
        const apiUrl = `https://api.hiuraa.my.id/downloader/savetube?url=${encodeURIComponent(videoUrl)}&format=mp3`;

        const download = async () => {
            const downloadResponse = await axios.get(apiUrl);
            const downloadData = downloadResponse.data;

            if (!downloadData.status || !downloadData.result?.download) {
                return m.reply("❌ *فشل تحميل الأغنية.*");
            }

            const downloadUrl = downloadData.result.download;

            await conn.sendMessage(m.chat, {
                audio: { url: downloadUrl },
                mimetype: "audio/mpeg"
            }, { quoted: m });
        };

        download(); // بدء عملية التحميل
await m.react('✅')
    } catch (error) {
        console.error("Error:", error);
        m.reply("❌ *حدث خطأ أثناء تنفيذ الطلب.*");
    }
};

handler.help = ["صوت"];
handler.tags = ["downloader"];
handler.command = /^(صوت)$/i;
handler.register = false;

export default handler;