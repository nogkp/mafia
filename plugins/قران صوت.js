import axios from 'axios';

const Murottal = {
    async list() {
        try {
            let res = await axios.get('https://www.assabile.com/ajax/loadplayer-12-9');
            if (!res.data || !res.data.Recitation) throw new Error('تنصيق البيانات غير صالح');
            return res.data.Recitation;
        } catch (error) {
            console.error('حدث خطا:', error.message);
            return [];
        }
    },
    async search(q) {
        let list = await Murottal.list();
        if (list.length === 0) return [];

        if (typeof q === 'number') return [list[q - 1]];

        q = q.toLowerCase().replace(/\W/g, '');
        return list.filter(_ => 
            _.span_name.toLowerCase().replace(/\W/g, '').includes(q)
        );
    },
    async audio(d) {
        try {
            if (!d.href) throw new Error('لا تحتوي البيانات علي المدخل الصحيح');
            let res = await axios.get(`https://www.assabile.com/ajax/getrcita-link-${d.href.slice(1)}`, {
                headers: {
                    'authority': 'www.assabile.com',
                    'accept': '*/*',
                    'referer': 'https://www.assabile.com/abdul-rahman-al-sudais-12/abdul-rahman-al-sudais.htm',
                    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
                    'sec-ch-ua-mobile': '?1',
                    'sec-ch-ua-platform': '"Android"',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
                    'x-requested-with': 'XMLHttpRequest'
                },
                decompress: true
            });

            if (!res.data) throw new Error('فشل الحصول على الصوت');
            return res.data;
        } catch (error) {
            console.error('خطا:', error.message);
            return null;
        }
    }
};

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('‏ ┈──── • ◞☆◜ • ────┈ ⋅\n> *_مـن فـضـلـك قـم بـتـحديـد ࢪقــــم الـسـوࢪه الـلتـي تـࢪيـد مـني احـضـاࢪها لـك بـمـعـني ان القـࢪان `114` سـوࢪه تـبـدا بـࢪقم `1` وهـي سـوࢪه الـفـاتـحه ويـنـتـهي ب الـسوࢪه `114` وهـي سـوࢪه الـنـاس_*\n‏ ┈──── • ◞☆◜ • ────┈ ⋅');
    try {
        let searchResults = await Murottal.search(isNaN(parseInt(text)) ? text : parseInt(text));
        if (searchResults.length === 0) return m.reply('معلومات البحث غير صحيحه.');

        let audioUrl = await Murottal.audio(searchResults[0]);
        if (!audioUrl) return m.reply('*_انـت شـايـفنـي مـسـيـلمـه الـكذاب عـلـشـان اخـتـرعـلـك قـࢪان جـديـد مـن عـنـدي 😑._*');

        await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: m });
    } catch (error) {
        console.error(error);
        m.reply('An error occurred while fetching data.');
    }
};

handler.help = ['quranmp3'];
handler.tags = ['islamic'];
handler.command = /^(قران_صوت)$/i;

export default handler;