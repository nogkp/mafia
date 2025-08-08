import { watchFile, unwatchFile } from 'fs' 

import chalk from 'chalk'

import { fileURLToPath } from 'url'

import fs from 'fs'

import cheerio from 'cheerio'

import fetch from 'node-fetch'

import axios from 'axios'

import moment from 'moment-timezone' 

//---------[ Añada los numeros a ser Propietario/a ]---------

global.owner = [['201208076133', '𝐴𝐻𝑀𝐴𝐷-𝑀𝐴𝐹𝐼𝐴', true], ['201208076133'], ['201208076133'], ['201208076133'], ['201558274316']]

global.mods = []

global.prems = []

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:

//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)

global.botNumberCode = "" //Ejemplo: +59309090909

global.confirmCode = "" 

//cambia a false Desactivar en "auto-reconexion" de sub-bots

global.gataJadibts = true 

// Cambiar a false para usar el Bot desde el mismo numero del Bot.

global.isBaileysFail = false

//---------[ APIS GLOBAL ]---------

global.openai_key = 'sk-...OzYy' /* Consigue tu ApiKey en este enlace: https://platform.openai.com/account/api-keys */

global.openai_org_id = 'HITjoN7H8pCwoncEB9e3fSyW' /* Consigue tu ID de organizacion en este enlace: https://platform.openai.com/account/org-settings */

global.Key360 = ['964f-0c75-7afc'] //key de violetics

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']

global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]

global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']

global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]

global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']

global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]

global.lolkeysapi = "GataDiosV2"

global.itsrose = ['4b146102c4d500809da9d1ff']

global.baileys = 'baileys-pro'

global.apis = 'https://atom.bio/'

global.APIs = {

    xteam: 'https://api.xteam.xyz', 

    dzx: 'https://api.dhamzxploit.my.id',

    lol: 'https://api.lolhuman.xyz',

    violetics: 'https://violetics.pw',

    neoxr: 'https://api.neoxr.my.id',

    zenzapis: 'https://api.zahwazein.xyz',

    akuari: 'https://api.akuari.my.id',

    akuari2: 'https://apimu.my.id',	

    fgmods: 'https://api-fgmods.ddns.net',

    botcahx: 'https://api.botcahx.biz.id',

    ibeng: 'https://api.ibeng.tech/docs',	

    rose: 'https://api.itsrose.site',

    popcat: 'https://api.popcat.xyz',

    xcoders: 'https://api-xcoders.site'

}

global.APIKeys = {

    'https://api.xteam.xyz': `${keysxteam}`,

    'https://api.lolhuman.xyz': `${lolkeysapi}`,

    'https://api.neoxr.my.id': `${keysneoxr}`,	

    'https://violetics.pw': 'beta',

    'https://api.zahwazein.xyz': `${keysxxx}`,

    'https://api-fgmods.ddns.net': 'fg-dylux',

    'https://api.botcahx.biz.id': 'Admin',

    'https://api.ibeng.tech/docs': 'tamvan',

    'https://api.itsrose.site': 'Rs-Zeltoria',

    'https://api-xcoders.site': 'Frieren'

}

global.cheerio = cheerio

global.fs = fs

global.fetch = fetch

global.axios = axios

global.moment = moment	

//------------------------[ Stickers ]-----------------------------

global.packname = '𝐌𝐀𝐅𝐈𝐴'

global.author = '𝐌𝐀𝐅𝐈𝐴'

//------------[ Versión | Nombre | cuentas ]------------

global.wm = '𓆩𝐌𝐀𝐅𝐈𝐴-𝐁𝐎𝐓𓆪-𝐌𝐃' 

global.botname = '𝑀𝐴𝐹𝐼𝐴'

global.vs = '1.9.5'

global.yt = 'https://www.youtube.com/'

global.tiktok = 'tiktok.com/'

global.md = 'https://atom.bio/'

global.fb = 'https://www.youtube.com/'

global.face = 'https://www.instagram.com/v3y_o'

//------------- [ Enlaces de los canales ] --------------------

global.nna = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //Update

global.nna2 = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //LoliBot update

global.nnaa = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //LoliBot - Test

global.nn = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //Grupo 1

global.nnn = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //Grupo 2

global.nnnt = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //Grupo del Colaboracion

global.nnnt2 = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' // Grupo COL 2

global.nnntt = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //Grupo COL 3

global.nnnttt = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //enlace lolibot

global.nnntttt = 'https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n' //Grupo ayuda sobre el bot

//-------------------------[ Links de contacto ]----------------------

global.bot = 'wa.me/201208076133'

global.asistencia = `${fb}`

global.redes = [nna, nna2, yt, nn, md, tiktok, fb, nnn, face]

//------------------------[ Mensajes de estado ]--------------------------

global.wait = '⧈═━━━━━━✦🌸✦━━━━━━═⧈ \n*❪🌸❫:•⪼ جاري التحميل*\n*┊•⪼ ❪ ▬▭▭▭ ❫*\n⧈═━━━━━━✦🌸✦━━━━━━═⧈'

global.waitt = '⧈═━━━━━━✦🌸✦━━━━━━═⧈ \n*❪🌸❫:•⪼ جاري التحميل*\n*┊•⪼ ❪ ▬▬▭▭▭ ❫*\n⧈═━━━━━━✦🌸✦━━━━━━═⧈'

global.waittt = '⧈═━━━━━━✦🌸✦━━━━━━═⧈ \n*❪🌸❫:•⪼ جاري التحميل*\n*┊•⪼ ❪ ▬▬▬▬▭▭ ❫*\n⧈═━━━━━━✦🌸✦━━━━━━═⧈'

global.waitttt = '⧈═━━━━━━✦🌸✦━━━━━━═⧈ \n*❪🌸❫:•⪼ جاري التحميل*\n*┊•⪼ ❪ ▬▬▬▬▬▬▭ ❫*\n⧈═━━━━━━✦🌸✦━━━━━━═⧈'

global.waittttt = '⧈═━━━━━━✦🌸✦━━━━━━═⧈ \n*❪🌸❫:•⪼ جاري التحميل*\n*┊•⪼ ❪ ▬▬▬▬▬▬▬ ❫*\n⧈═━━━━━━✦🌸✦━━━━━━═⧈'

//-------------------------[ Links de imagenes y videos ]------------------------------

global.img1 = 'https://files.catbox.moe/ik8w8t.jpg'

global.img2 = 'https://files.catbox.moe/09sf67.jpg'

global.imagen = fs.readFileSync('./media/Menu2.jpg')

global.imagen1 = fs.readFileSync('./media/Menu1.jpg')

global.imagen2 = fs.readFileSync('./media/Menu2.jpg')

global.imagen3 = fs.readFileSync('./media/Menu3.jpg')

global.imagen4 = fs.readFileSync('./media/Menu4.jpg')

global.imagen5 = 'https://files.catbox.moe/2odzkn.jpg'

global.imagen6 = 'https://files.catbox.moe/lxflp0.jpg'

global.menu18 = 'https://files.catbox.moe/ggrqua.jpg'

global.vid1 = 'https://qu.ax/dcAc.mp4'

global.img = [imagen, imagen1, imagen2, imagen3, imagen4]

global.imageUrl = ["https://files.catbox.moe/2odzkn.jpg", "https://files.catbox.moe/lxflp0.jpg", "https://files.catbox.moe/zzscpq.jpg"]

global.rg = '『✅ النتائج ✅』\n\n'

global.resultado = rg

global.ag = '『⚠️ إعلان ⚠️』\n\n'

global.advertencia = ag

global.iig = '『❕ مـعـلــومــة 』\n\n'

global.informacion = iig

global.fg = '『❌ 𝙀𝙍𝙍𝙊𝙍 ❌』\n\n'

global.fallo = fg

global.mg = '『❗️ 𝙇𝙊 𝙐𝙎𝙊 𝙈𝘼𝙇❗』\n\n'

global.mal = mg

global.eeg = '『📩 𝙍𝙀𝙋𝙊𝙍𝙏𝙀 📩』\n\n'

global.envio = eeg

global.eg = '『💚 𝙀𝙓𝙄𝙏𝙊𝙎 💚』\n\n'

global.exito = eg

//-------------------------[ IMAGEN ]------------------------------

global.flaaa = [

  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',

  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',

  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',

  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',

  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='

]

//---------------[ IDs de canales ]----------------

global.ch = {

  ch1: '120363400740835292@newsletter', 

  ch2: '120363400740835292@newsletter', 

  ch3: '120363400740835292@newsletter',

  ch4: '120363400740835292@newsletter',

  ch5: '120363400740835292@newsletter', 

}

 

let file = fileURLToPath(import.meta.url)

watchFile(file, () => {

  unwatchFile(file)

  console.log(chalk.redBright("Update 'config.js'"))

  import(`${file}?update=${Date.now()}`)

})

