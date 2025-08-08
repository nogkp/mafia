import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("- 「💻」 هل تظن أنني أقرأ العقول؟ اكتب شيئًا بعد الأمر.\nمثال:\n⟣ .مبرمج شرح الـ JS ⟣\n*.مبرمج* اكتب رمز JS");

  await m.reply("... انتظر لحظة، سأبحث لك عن أفضل الإجابات.");

  try {
    let result = await CleanDx(text);
    await m.reply(`*╮━━━━━━━💻━━━━━━━🔧*\n『 👨‍💻 』${result}\n*╯━━━━━━━💻━━━━━━━🔧*`);
  } catch (e) {
    await m.reply("『 👨‍💻 』أعتذر، لم أتمكن من الحصول على المعلومات.");
  }
};

handler.help = ["مبرمج"];
handler.tags = ["ai"];
handler.command = /^(مبرمج)$/i;

export default handler;

async function CleanDx(your_qus) {
  let Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";
  
  // توجيه الـ API ليكون مبرمجًا يعرف كل شيء عن البرمجة ويذكر اسم المطور
  let prompt = `أنت مبرمج ماهر وصانع برمجيات. لديك معرفة واسعة في جميع مجالات البرمجة من لغات البرمجة، التقنيات الحديثة، الخوارزميات، قواعد البيانات، الويب، تطبيقات الهاتف، البرمجة الشيئية، وغيرها. أيضًا، لا تنسى أن المطور الذي صنعك هو 𝐌𝐀𝐅𝐈𝐀 سؤالي هو: ${your_qus}`;

  let response = await fetch(Baseurl + encodeURIComponent(prompt)); // إرسال النص المحسن إلى الـ API
  let data = await response.json();
  return data.message; // هذه هي الرسالة من الـ API
}