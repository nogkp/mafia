const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion} = (await import(global.baileys));
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util' 
import * as ws from 'ws'
import { getDevice } from '@whiskeysockets/baileys'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
import '../plugins/_content.js'
import { fileURLToPath } from 'url'
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = "CkphZGlib3QsIEhlY2hv"
let drm2 = "IHBvciBAQWlkZW5fTm90TG9naWM"
let rtx = `${lenguajeGB['smsIniJadi']()}`
let rtx2 = `${lenguajeGB['smsIniJadi2']()}`

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gataJBOptions = {}
const retryMap = new Map(); 
const maxAttempts = 5;
if (global.conns instanceof Array) console.log()
else global.conns = []
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
if (!global.db.data.settings[conn.user.jid].jadibotmd) return m.reply(`${lenguajeGB['smsSoloOwnerJB']()}`)
if (m.fromMe || conn.user.jid === m.sender) return
//if (conn.user.jid !== global.conn.user.jid) return conn.reply(m.chat, `${lenguajeGB['smsJBPrincipal']()} wa.me/${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}`, m) 
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let id = `${who.split`@`[0]}`  //conn.getName(who)
let pathGataJadiBot = path.join("./GataJadiBot/", id)
if (!fs.existsSync(pathGataJadiBot)){
fs.mkdirSync(pathGataJadiBot, { recursive: true })
}
gataJBOptions.pathGataJadiBot = pathGataJadiBot
gataJBOptions.m = m
gataJBOptions.conn = conn
gataJBOptions.args = args
gataJBOptions.usedPrefix = usedPrefix
gataJBOptions.command = command
gataJBOptions.fromCommand = true
gataJadiBot(gataJBOptions)
} 
handler.command = /^(فعل|serbot|rentbot|تنصيب)/i
export default handler 

export async function gataJadiBot(options) {
let { pathGataJadiBot, m, conn, args, usedPrefix, command } = options
if (command === 'تنصيب') {
command = 'فعل'; 
args.unshift('تنصيب')}

const mcode = args[0] && /(--تنصيب|تنصيب)/.test(args[0].trim()) ? true : args[1] && /(--تنصيب|تنصيب)/.test(args[1].trim()) ? true : false;
let txtCode, codeBot, txtQR
if (mcode) {
args[0] = args[0].replace(/^--تنصيب$|^تنصيب$/, "").trim()
if (args[1]) args[1] = args[1].replace(/^--تنصيب$|^تنصيب$/, "").trim()
if (args[0] == "") args[0] = undefined
}
const pathCreds = path.join(pathGataJadiBot, "creds.json")
if (!fs.existsSync(pathGataJadiBot)){
fs.mkdirSync(pathGataJadiBot, { recursive: true })}
try {
args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
} catch {
conn.reply(m.chat, `*استخدم الامر بشكل صحيح:* \`${usedPrefix + command} تنصيب\``, m)
return
}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathGataJadiBot)

const connectionOptions = {
logger: pino({ level: "fatal" }),
printQRInTerminal: false,
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache,
browser: mcode ? ['Windows', 'Chrome', '110.0.5585.95'] : ['FOX-BOT (Sub Bot)', 'Chrome','2.0.0'],
version: version,
generateHighQualityLinkPreview: true
};

let sock = makeWASocket(connectionOptions)
sock.isInit = false
let isInit = true
let reconnectAttempts = 0;

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !mcode) {
if (m?.chat) {
txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim() + '\n' + drmer.toString("utf-8")}, { quoted: m})
} else {
return 
}
if (txtQR && txtQR.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 30000)
}
return
} 
if (qr && mcode) {
let secret = await sock.requestPairingCode((m.sender.split`@`[0]))
secret = secret.match(/.{1,4}/g)?.join("-")
const dispositivo = await getDevice(m.key.id);
if (!m.isWABusiness) {
if (/web|desktop|unknown/i.test(dispositivo)) {
txtCode = await conn.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/idr42d.webp' || gataMenu.getRandom() }, caption: rtx2.trim() + '\n' + drmer.toString("utf-8") }, { quoted: m })
codeBot = await m.reply(secret);
} else {
txtCode = await conn.sendButton(m.chat, rtx2.trim() + '\n' + String("ᎷᎬᎠϴᎻᎪᏟᏦᎬᎡᏃ"),wm + `\n*الـكـود:* ${secret}`, 'https://files.catbox.moe/idr42d.webp' || 'https://files.catbox.moe/idr42d.webp', null, [[`نـسـخ الـكـود`, secret]], null, null, m)
}} else {
txtCode = await conn.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/idr42d.webp' || gataMenu.getRandom() }, caption: rtx2.trim() + '\n' + drmer.toString("utf-8") }, { quoted: m })
codeBot = await m.reply(secret);
}
console.log(secret);
}
if ((txtCode && txtCode.key) || (txtCode && txtCode.id)) {
const messageId = txtCode.key || txtCode.id
setTimeout(() => { conn.sendMessage(m.sender, { delete: messageId })}, 30000)
}
if (codeBot && codeBot.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key })}, 30000)
}
const endSesion = async (loaded) => {
if (!loaded) {
try {
sock.ws.close()
} catch {
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)		
if (i < 0) return 
delete global.conns[i]
global.conns.splice(i, 1)
}}

const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (connection === 'close') {
if (reason === 428) {
if (reconnectAttempts < maxAttempts) {
const delay = 1000 * Math.pow(2, reconnectAttempts); 
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ الاتصال (+${path.basename(pathGataJadiBot)}) تم إغلاقه بشكل غير متوقع. محاولة إعادة الاتصال في ${delay / 1000} ثواني... (حاول ${reconnectAttempts + 1}/${maxAttempts})\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await sleep(1000);
reconnectAttempts++;
await creloadHandler(true).catch(console.error);
} else {
console.log(chalk.redBright(`بوت فرعي (+${path.basename(pathGataJadiBot)}) محاولات إعادة الاتصال باءت بالفشل. تحاول لاحقا...`));
}            
/*console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathGataJadiBot)}) fue cerrada inesperadamente. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)*/
}
if (reason === 408) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ الاتصال (+${path.basename(pathGataJadiBot)}) حدث خطا. السبب: ${reason}. محاوله اعاده الاتصال...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 440) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ الاتصال (+${path.basename(pathGataJadiBot)}) تم استبداله بجلسه نشطه اخري\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
try {
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathGataJadiBot)}@s.whatsapp.net`, {text : '> تم التحقق بنجاح\n\n> اكتب الان الامر .تنصيب' }, { quoted: m || null }) : ""
} catch (error) {
console.error(chalk.bold.yellow(`خطا حاول مجدددا: +${path.basename(pathGataJadiBot)}`))
}}
if (reason == 405 || reason == 401) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ في الجلسه (+${path.basename(pathGataJadiBot)}) تم إغلاقه. أوراق اعتماد غير صافية أو جهاز منفصل يدويًا..\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
try {
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathGataJadiBot)}@s.whatsapp.net`, {text : '*_تم التحقق بنجاح_*\n\n> اكتب الان الامر .تنصيب' }, { quoted: m || null }) : ""
} catch (error) {
console.error(chalk.bold.yellow(`خطا حاول مجدددا: +${path.basename(pathGataJadiBot)}`))
}
fs.rmdirSync(pathGataJadiBot, { recursive: true })
}
if (reason === 500) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ فقدت الاتصال ب الجلسه (+${path.basename(pathGataJadiBot)}). محو البيانات...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))

if (options.fromCommand) {
m?.chat ? await conn.sendMessage(m.chat, {text: '*خساره الاتصال*\n\n> *لقد حاولت يدويا تكوين بوت فرعي حاول مجددا*' }, { quoted: m || null }) : ""
}
//fs.rmdirSync(pathGataJadiBot, { recursive: true })
}
if (reason === 515) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ اعاده التشغيل التلقائي للجلسه (+${path.basename(pathGataJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 403) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ الجلسه مغلقه (+${path.basename(pathGataJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
fs.rmdirSync(pathGataJadiBot, { recursive: true })
}}

if (global.db.data == null) loadDatabase()
if (connection == `open`) {
reconnectAttempts = 0; 
if (!global.db.data?.users) loadDatabase()
let userName, userJid 
userName = sock.authState.creds.me.name || 'Anónimo'
userJid = sock.authState.creds.me.jid || `${path.basename(pathGataJadiBot)}@s.whatsapp.net`
console.log(chalk.bold.cyanBright(`\n❒⸺⸺⸺⸺【• بــوت-فـࢪعـي •】⸺⸺⸺⸺❒\n│\n│ 🟢 ${userName} (+${path.basename(pathGataJadiBot)}) تم الاتصال بنجاح.\n│\n❒⸺⸺⸺【• متصل •】⸺⸺⸺❒`))
sock.isInit = true
global.conns.push(sock)

let user = global.db.data?.users[`${path.basename(pathGataJadiBot)}@s.whatsapp.net`]
m?.chat ? await conn.sendMessage(m.chat, {text : args[0] ? `${lenguajeGB['smsJBCargando'](usedPrefix)}` : `${lenguajeGB['smsJBConexionTrue2']()}` + ` ${usedPrefix + command}`}, { quoted: m }) : ''
let chtxt = `
👤 *المستخدم:* ${userName}
${user?.registered ? `🗃️ *التسجيل:* ${user?.registered ? 'نعم' : 'لا'}` : ''}
${user?.registered ? `✅ *التحقق:* ${user?.registered ? user.name : 'لا'}` : ''}
🔑 *طريقه الاتصال:* ${mcode ? 'عن طريق الرمز' : 'Qr كود'}
💻 *المتصفح:* ${mcode ? 'Ubuntu' : 'Chrome'}
📱 *نوع الواتساب:* ${m?.isWABusiness ? 'الاعمال' : 'واتساب مسنجر'}
🦊 *البوت:* ${gt}
> *¡تم تشغيل خاصيه البوت الفرعي بنجاح!*
wa.me/${path.basename(pathGataJadiBot)}?text=.تنصيب
`.trim()
let ppch = await sock.profilePictureUrl(userJid, 'image').catch(_ => gataMenu)
await sleep(3000)
await global.conn.sendMessage(ch.ch1, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 الاشـــعــاࢪات  - االــ؏ــامـه  🔔 】",
body: '🙀 ¡وجـدت بـوتـات فـــࢪعـــيـه جـــديـده!!',
thumbnailUrl: ppch,
sourceUrl: accountsgb,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
await sleep(3000)
await joinChannels(sock)
m?.chat ? await conn.sendMessage(m.chat, {text : `> لـقـد فـعـلت الــبـوت الـــفـࢪعـي بــــنـجاح

> تابع قناه المطور لمزيد من التحديثات 

https://whatsapp.com/channel/0029VaoUBmSKmCPIIiEatx1H`}, { quoted: m }) : ''
}}
setInterval(async () => {
if (!sock.user) {
try { sock.ws.close() } catch (e) {      
//console.log(await creloadHandler(true).catch(console.error))
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)		
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler

} catch (e) {
console.error('Nuevo error: ', e)
}
if (restatConn) {
const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
sock = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
sock.ev.off('messages.upsert', sock.handler)
sock.ev.off('group-participants.update', sock.participantsUpdate)
sock.ev.off('groups.update', sock.groupsUpdate)
sock.ev.off('message.delete', sock.onDelete)
sock.ev.off('call', sock.onCall)
sock.ev.off('connection.update', sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}
sock.welcome = lenguajeGB['smsWelcome']() 
sock.bye = lenguajeGB['smsBye']() 
sock.spromote = lenguajeGB['smsSpromote']() 
sock.sdemote = lenguajeGB['smsSdemote']() 
sock.sDesc = lenguajeGB['smsSdesc']() 
sock.sSubject = lenguajeGB['smsSsubject']() 
sock.sIcon = lenguajeGB['smsSicon']() 
sock.sRevoke = lenguajeGB['smsSrevoke']()

sock.handler = handler.handler.bind(sock)
sock.participantsUpdate = handler.participantsUpdate.bind(sock)
sock.groupsUpdate = handler.groupsUpdate.bind(sock)
sock.onDelete = handler.deleteUpdate.bind(sock)
sock.onCall = handler.callUpdate.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)

sock.ev.on(`messages.upsert`, sock.handler)
sock.ev.on(`group-participants.update`, sock.participantsUpdate)
sock.ev.on(`groups.update`, sock.groupsUpdate)
sock.ev.on(`message.delete`, sock.onDelete)
sock.ev.on(`call`, sock.onCall)
sock.ev.on(`connection.update`, sock.connectionUpdate)
sock.ev.on(`creds.update`, sock.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
})
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}

async function joinChannels(conn) {
for (const channelId of Object.values(global.ch)) {
await conn.newsletterFollow(channelId).catch(() => {})
}}

async function checkSubBots() {
    const subBotDir = path.resolve("./GataJadiBot");
    if (!fs.existsSync(subBotDir)) return;
    const subBotFolders = fs.readdirSync(subBotDir).filter(folder => 
        fs.statSync(path.join(subBotDir, folder)).isDirectory()
    );

    for (const folder of subBotFolders) {
        const pathGataJadiBot = path.join(subBotDir, folder);
        const credsPath = path.join(pathGataJadiBot, "creds.json");
        const subBot = global.conns.find(conn => 
            conn.user?.jid?.includes(folder) || path.basename(pathGataJadiBot) === folder);

        if (!fs.existsSync(credsPath)) {
console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ بوت فرعي (+${folder}) ليس لديه creds.json. قم بالحذف...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
continue
}

        if (!subBot || !subBot.user) {
            console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ بوت فرعي (+${folder}) غير متصل أو تمت إضافته مؤخرًا. محاولة تفعيله...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            const retries = retryMap.get(folder) || 0;
            if (retries >= 5) {
                console.log(chalk.redBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ بوت فرعي (+${folder}) تم الوصول إلى حد إعادة المحاولة..\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
             //  fs.rmdirSync(pathGataJadiBot, { recursive: true });
                retryMap.delete(folder);
                continue;
            }

            try {
                await gataJadiBot({
                    pathGataJadiBot,
                    m: null,
                    conn: global.conn,
                    args: [],
                    usedPrefix: '#',
                    command: 'فعل',
                    fromCommand: false
                });
                retryMap.delete(folder); // Resetear intentos si se conecta
            } catch (e) {
                console.error(chalk.redBright(`خطأ في تنشيط الروبوت الفرعي (+${folder}):`), e);
                retryMap.set(folder, retries + 1);
            }
        }
    }
}

setInterval(checkSubBots, 1800000); //30min