import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
let nek = ne.split('\n')
let neko = pickRandom(nek)
conn.sendFile(m.chat, neko, 'error.jpg', `Nyaww~ 🐾💗`, m)
//conn.sendButton(m.chat, 'شايفك يلي مش لقيلك قطه ~ 🐾💗', wm, neko, [['كــــــمان ', `/${command}`]], null, null, m)
}
handler.command = /^(انمي_قطط)$/i
handler.tags = ['anime']
handler.help = ['neko']
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}