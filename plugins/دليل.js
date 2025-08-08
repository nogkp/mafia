import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("- 「📚」 هل تظن أنني أقرأ العقول؟ اكتب شيئًا بعد الأمر.\nمثال:\n⟣ .دليل افضل انمي ⟣\n*.دليل* اكتب رمز JS");

  await m.reply("... انتظر لحظة، سأبحث لك عن أفضل الإجابات.");

  try {
    let result = await CleanDx(text);
    await m.reply(`*╮━━━━━━━🎬━━━━━━━🎥*\n『 📚 』${result}\n*╯━━━━━━━🎬━━━━━━━🎥*`);
  } catch (e) {
    await m.reply("『 📚 』أعتذر، لم أتمكن من الحصول على المعلومات.");
  }
};

handler.help = ["دليل"];
handler.tags = ["ai"];
handler.command = /^(دليل)$/i;

export default handler;

async function CleanDx(your_qus) {
  let Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";
  
  // توجيه الـ API ليكون دليل شامل يعرف كل شيء عن الأنمي، المسلسلات، الكرتون، الأفلام، المانهوا وكل شيء ترفيهي
  let prompt = `أنت دليل شامل لكل شيء يتعلق بالترفيه. يجب أن تكون قادرًا على تقديم معلومات عن الأنمي، المسلسلات، الكرتون، الأفلام، المانهوا وكل أنواع الترفيه. سؤالي هو: ${your_qus}`;

  let response = await fetch(Baseurl + encodeURIComponent(prompt)); // إرسال النص المحسن إلى الـ API
  let data = await response.json();
  return data.message; // هذه هي الرسالة من الـ API
}