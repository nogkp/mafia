const zodiak = [
    ["بـࢪج الـــجـدي", new Date(1970, 0, 1)],
    ["بــــࢪج الــــدلـو", new Date(1970, 0, 20)],
    ["بـــࢪج الــحوت", new Date(1970, 1, 19)],
    ["بــرج الــــحـمل", new Date(1970, 2, 21)],
    ["بــــرج الـــثـور", new Date(1970, 3, 21)],
    ["بــرج الـــجــوزاء", new Date(1970, 4, 21)],
    ["بـرج الـــسـࢪطان", new Date(1970, 5, 22)],
    ["بـــࢪج الاســـــد", new Date(1970, 6, 23)],
    ["بــرج الــــعذراء", new Date(1970, 7, 23)],
    ["بــرج الـــميـزان", new Date(1970, 8, 23)],
    ["بــرج الـــعـقـࢪب", new Date(1970, 9, 23)],
    ["بـــرج الـــــقـوس", new Date(1970, 10, 22)],
    ["بـࢪج الـــجـدي", new Date(1970, 11, 22)]
].reverse();

function getZodiac(month, day) {
    let d = new Date(1970, month - 1, day);
    return zodiak.find(([_, _d]) => d >= _d)[0];
}

const zodiacImages = {
    "بـࢪج الـــجـدي": "https://tinyurl.com/2y66lmt7",
    "بــــࢪج الــــدلـو": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiRwfiNKlZWRe3aGEDAvUZ0hmp1MroWsRkwiijDSLfeSQjZ6lJi16ZVAk&s=10",
    "بـــࢪج الــحوت": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0BYALUYH4UZh8n7eyzp2_CuC46deSKyV5Ig&usqp=CAU",
    "بــرج الــــحـمل": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVnG2JCEwUck9ZQglGA4Xo9k3pBrx1wlKA0w&usqp=CAU",
    "بــــرج الـــثـور": "https://cdn.al-ain.com/lg/images/2024/12/30/205-151112-569892668-which-day-is-unlucky-for-taurus_700x400.jpg",
    "بــرج الـــجــوزاء": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx87bWkzKqoTHYhtnIMQnIOjD7UGLVZs5uig&usqp=CAU",
    "بـرج الـــسـࢪطان": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5cLZPSIBavzVrwlaQyjCOxuwz7ja9gkv6iA&usqp=CAU",
    "بـــࢪج الاســـــد": "https://img.youm7.com/ArticleImgs/2023/7/9/88919-%D8%B5%D9%81%D8%A7%D8%AA-%D8%A8%D8%B1%D8%AC-%D8%A7%D9%84%D8%A7%D8%B3%D8%AF.JPG",
    "بــرج الــــعذراء": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bqgo3CI6hZiRlsKvJclg6WJrz1IRTpOLKA&usqp=CAU",
    "بــرج الـــميـزان": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gpgW6DH8Nok-IV93PrF6c4Ot96CGhzz8V1bLcOhWg5jTWa8FVbVeIoNc&s=10",
    "بــرج الـــعـقـࢪب": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLmEmm78Be18b5giYBgQbGNC9xWLXVNu8IEA&usqp=CAU",
    "بـــرج الـــــقـوس": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAlNGTCFpoHxuwknb9-vM1Fre8wq3VTV0-rg&usqp=CAU",
};

const handler = async (m, { usedPrefix, command, text }) => {
    if (!text) throw `مثال:\n${usedPrefix + command} سنة شهر يوم\n\n${usedPrefix + command} 2007 05 17`;

    const date = new Date(text);
    if (date == 'Invalid Date') throw date;
    const d = new Date();
    const [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
    const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

    const zodiac = getZodiac(birth[1], birth[2]);
    const ageD = new Date(d - date);
    const age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear();

    const birthday = [tahun + (+new Date(1970, bulan - 1, tanggal) > +new Date(1970, birth[1] - 1, birth[2])), ...birth.slice(1)];
    const cekusia = bulan === birth[1] && tanggal === birth[2] ? `عيد ميلاد سعيد! عمرك الآن ${age} 🥳` : age;

    const nextBirthday = new Date(tahun, birth[1] - 1, birth[2]);
    nextBirthday.setFullYear(tahun + (nextBirthday < d));
    const timeUntilNextBirthday = nextBirthday - d - 7 * 60 * 60 * 1000;

    const daysUntilNextBirthday = Math.floor(timeUntilNextBirthday / (1000 * 60 * 60 * 24));
    const monthsUntilNextBirthday = Math.floor(daysUntilNextBirthday / 30);
    const hoursUntilNextBirthday = Math.floor(timeUntilNextBirthday / (1000 * 60 * 60));
    const minutesUntilNextBirthday = Math.floor((timeUntilNextBirthday % (1000 * 60 * 60)) / (1000 * 60));
    const secondsUntilNextBirthday = Math.floor((timeUntilNextBirthday % (1000 * 60)) / 1000);

    const newTime = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    const newHours = newTime.getHours();
    const newMinutes = newTime.getMinutes();
    const newSeconds = newTime.getSeconds();

    const WaktuSekarangReplit = `${newHours}:${newMinutes}:${newSeconds}`;

    let caption = `
📅 الميلاد: ${birth.join('-')}
🎉 عيد ميلادك: ${birthday.join('-')}
👶 العمر الحالي: ${cekusia} سنه
🎂 عيد الميلاد القادم: ${cekusia + 1} سنه
♈ البرج: ${zodiac}
🕰️ الوقت الحالي: ${WaktuSekarangReplit}
✨ باقي ${monthsUntilNextBirthday} شهر و ${daysUntilNextBirthday % 30} أيام على عيد ميلادك 🎂
⏳ ${hoursUntilNextBirthday} ساعة و ${minutesUntilNextBirthday} دقيقة و ${secondsUntilNextBirthday} ثانية حتى عيد ميلادك 🎉
`.trim();

    let image = zodiacImages[zodiac];

    await conn.sendFile(m.chat, image, 'image.jpg', caption, m);
};

handler.help = ['zodiac *2002 02 25*'];
handler.tags = ['tools'];
handler.command = /^(zodia[kc]|jodiak|برجي|برج)$/i;

export default handler;