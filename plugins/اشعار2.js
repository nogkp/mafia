import { Maker } from 'imagemaker.js';

let handler = async (m, { conn, args, command }) => {
  const response = args.join(' ').split('|');
  if (!args[0]) throw '⚠️ من فضلك أدخل الاسم بعد الأمر';

  const links = {
    'قلب-حب': 'https://en.ephoto360.com/text-heart-flashlight-188.html',
    'كريسماس': 'https://en.ephoto360.com/christmas-effect-by-name-376.html',
    'زوجئ': 'https://en.ephoto360.com/sunlight-shadow-text-204.html',
    'نص-مشوش': 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
    'حزين': 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
    'جيمينج': 'https://en.ephoto360.com/make-team-logo-online-free-432.html',
    'وحيد': 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
    'درأغون_بول': 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
    'نيون': 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
    'قطة': 'https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html',
    'فتاة_جيمر': 'https://en.ephoto360.com/create-cute-girl-gamer-mascot-logo-online-687.html',
    'آرمي': 'https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html',
    'ناروتو': 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
    'مستقبلي': 'https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html',
    'سحابه': 'https://en.ephoto360.com/cloud-text-effect-139.html',
    'ملاك': 'https://en.ephoto360.com/angel-wing-effect-329.html',
    'سماوي': 'https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html',
    'جرافيتي': 'https://en.ephoto360.com/text-graffiti-3d-208.html',
    'ماتريكس': 'https://en.ephoto360.com/matrix-text-effect-154.html',
    'رعب': 'https://en.ephoto360.com/blood-writing-text-online-77.html',
    'أجنحة': 'https://en.ephoto360.com/the-effect-of-galaxy-angel-wings-289.html',
    'ببجي': 'https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html',
    'ببجي_فتاة': 'https://en.ephoto360.com/pubg-mascot-logo-maker-for-an-esports-team-612.html',
    'لول': 'https://en.ephoto360.com/make-your-own-league-of-legends-wallpaper-full-hd-442.html',
    'امونج_أس': 'https://en.ephoto360.com/create-a-cover-image-for-the-game-among-us-online-762.html',
    'غلاف_لاعب': 'https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html',
    'غلاف_فريفاير': 'https://en.ephoto360.com/create-free-fire-facebook-cover-online-567.html',
    'فيديو_تايجر': 'https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html',
    'فيديو_مقدمة': 'https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html',
    'فيديو_جيمينج': 'https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html',
    'فيديو_ببجي': 'https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html',
    'محأرب': 'https://en.ephoto360.com/create-project-yasuo-logo-384.html'
  };

  if (command === 'تغريدة') {
    const [username, tweet] = response[0]?.split(':');
    if (!username || !tweet) return m.reply('📌 الصيغة الصحيحة: .تغريدة @الاسم:النص');
    return conn.sendMessage(m.chat, { text: `🐦 تغريدة وهمية:

@${username.trim()}:
${tweet.trim()}` }, { quoted: m });
  }

  const url = links[command];
  if (!url) throw '❌ الأمر غير مدعوم أو غير متوفر حالياً';

  try {
    await conn.reply(m.chat, '˼🪄˹ `جـاري عمل الـوجـو....`', m);
    const res = await new Maker().Ephoto360(url, [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'logo.jpg', '', m);
  } catch (e) {
    await conn.reply(m.chat, '❌ حدث خطأ أثناء إنشاء الشعار، حاول لاحقًا.', m);
  }
};

handler.command = /^قلب-حب|كريسماس|زوجئ|نص-مشوش|حزين|جيمينج|وحيد|درأغون_بول|نيون|قطة|فتاة_جيمر|آرمي|ناروتو|مستقبلي|سحابه|ملاك|سماوي|جرافيتي|ماتريكس|رعب|أجنحة|ببجي|ببجي_فتاة|لول|امونج_أس|غلاف_لاعب|غلاف_فريفاير|فيديو_تايجر|فيديو_مقدمة|فيديو_جيمينج|فيديو_ببجي|محأرب|تغريدة$/i;

export default handler;