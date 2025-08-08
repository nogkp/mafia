let handler = async (m, { conn, command, args }) => {
  let user = global.db.data.users[m.sender]
  if (!user) global.db.data.users[m.sender] = {}
  user = global.db.data.users[m.sender]

  // تهيئة بيانات اللاعب لو مش موجودة
  if (user.exp === undefined) user.exp = 0
  if (user.gold === undefined) user.gold = 0
  if (user.health === undefined) user.health = 100
  if (user.rpg_work === undefined) user.rpg_work = 'عاطل'

  if (command == 'مغامره') {
    // مغامرة عشوائية
    let foundGold = Math.floor(Math.random() * 100)
    let expGain = Math.floor(Math.random() * 50)
    let damage = Math.floor(Math.random() * 20)

    user.gold += foundGold
    user.exp += expGain
    user.health -= damage

    if (user.health < 0) user.health = 0

    let msg = `⚔️✨ مغامرة جديدة!
💰 الذهب المكتسب: ${foundGold}
⭐ الخبرة المكتسبة: ${expGain}
❤️ الضرر الذي تعرضت له: ${damage}
🧑‍🎓 وظيفتك: ${user.rpg_work}

📊 حالتك الآن:
💰 الذهب: ${user.gold}
⭐ الخبرة: ${user.exp}
❤️ الصحة: ${user.health}/100

اكتب *مغامره* مرة أخرى للمتابعة!
`
    m.reply(msg)
  }

  if (command == 'شغل') {
    // تعيين وظيفة
    if (!args[0]) return m.reply('📌 اكتب اسم الوظيفة: مثال\n\nشغل صياد')

    user.rpg_work = args[0]
    m.reply(`✅ تم تعيين وظيفتك إلى: ${args[0]}`)
  }

  if (command == 'حاله') {
    // حالة اللاعب
    let msg = `📊 حالتك الحالية:
💰 الذهب: ${user.gold}
⭐ الخبرة: ${user.exp}
❤️ الصحة: ${user.health}/100
🧑‍🎓 الوظيفة: ${user.rpg_work}`
    m.reply(msg)
  }

  if (command == 'علاج') {
    // استعادة الصحة
    if (user.gold < 50) return m.reply('❌ ليس لديك ذهب كافي للعلاج (يكلف 50 ذهب).')
    user.gold -= 50
    user.health = 100
    m.reply('✅ تم علاجك بالكامل! صحتك الآن 100.')
  }
}

handler.help = ['مغامره', 'شغل <وظيفة>', 'حاله', 'علاج']
handler.tags = ['rpg']
handler.command = ['مغامره', 'شغل', 'حاله', 'علاج']

export default handler