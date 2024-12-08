__path = process.cwd()
let express = require('express');
let creator = "zynfx"
let axios = require('axios')
let fs = require('fs')
let fetch = require('node-fetch');
let router = express.Router();
let hxz = require('hxz-api')
let api = require("caliph-api")
let zrapi = require('zrapi')
let scrapper = require('../lib/scraper/scraper')
let Searchnabi = require('../lib/scraper/kisahnabi')
const dcanvas = require('discord-canvas')
const canvac = require('canvacord')
let {
	tiktok,
	pinterest,
	mediafireDl,
	doujindesu,
	pinterestdl
} = require('../lib/index')

const {
	MongoClient
} = require("mongodb");
const uri = "mongodb+srv://yesir:v_Vc9R5VAbJPZ9A@cluster0.z47qy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
async function connectToDatabase(){
	return new Promise((resolve, reject) => {
    	client.connect(async (error, client) => {
			if (error) return console.log('Koneksi Gagal')
			console.log('Koneksi Ke Database Mongo Berhasil')
			resolve(client)
		});
	})
}
connectToDatabase().then(s => {
  db = s.db('apidata')
})
let options = require(__path + '/lib/options.js');
let {
	color,
	bgcolor
} = require(__path + '/lib/color.js');
let {
	getBuffer,
	fetchJson
} = require(__path + '/lib/fetcher.js');
async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
const misparam = (param) => {
	return {
		message: `Masukkan parameter ${param}!`
	}
}
function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
const isUrl = (url) => {
	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}
loghandler = {
	noturl: {
		status: false,
		creator: `${creator}`,
		code: 406,
		message: 'Masukan URL'
	},
	nurl: {
		status: false,
		message: 'Url not Valid!'
	},
	notquery: {
		status: false,
		creator: `${creator}`,
		code: 406,
		message: 'Masukkan query'
	},
	nottext1: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
	error: {
		status: 404,
		creator: `${creator}`,
		message: 'An internal error occurred. Please report via WhatsApp wa.me/6281314050985'
	}
}

// Downloader
router.get('/tiktok', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await tiktok(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/tikmate', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.tiktod(url).then(resu => res.json(resu))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/tiktokder', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.tiktokder(url).then(resu => resu.username != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/tebakkalimat', async (req, res, next) => {

        var soal = JSON.parse(
            fs.readFileSync(__path + '/lib/tebakkalimat.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...soal[~~(Math.random() * soal.length)]
         		})
		.catch(e => {
			res.json(loghandler.error)
		})
})

router.get('/tebakkata', async (req, res, next) => {

        var soal = JSON.parse(
            fs.readFileSync(__path + '/lib/tebakkata.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...soal[~~(Math.random() * soal.length)]
         })
		.catch(e => {
			res.json(loghandler.error)
		})
})

router.get('/tebakjenaka', async (req, res, next) => {

        var pertanyaan = JSON.parse(
            fs.readFileSync(__path + '/lib/tebakjenaka.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...pertanyaan[~~(Math.random() * pertanyaan.length)]
         })
		.catch(e => {
			res.json(loghandler.error)
		})
})

router.get('/tebakkimia', async (req, res, next) => {

        var nama = JSON.parse(
            fs.readFileSync(__path + '/lib/tebakkimia.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...nama[~~(Math.random() * nama.length)]
         })
		.catch(e => {
			res.json(loghandler.error)
		})
})

router.get('/tebaklirik', async (req, res, next) => {

        var question = JSON.parse(
            fs.readFileSync(__path + '/lib/tebaklirik.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...question[~~(Math.random() * question.length)]
         })
		.catch(e => {
			res.json(loghandler.error)
		})
})

router.get('/tebakchara', async (req, res, next) => {

        var name = JSON.parse(
            fs.readFileSync(__path + '/lib/tebakchara.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...name[~~(Math.random() * name.length)]
         })
		.catch(e => {
			res.json(loghandler.error)
		})
})

router.get('/tebaktebakan', async (req, res, next) => {

        var soal = JSON.parse(
            fs.readFileSync(__path + '/lib/tebaktebakan.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...soal[~~(Math.random() * soal.length)]
         })
		.catch(e => {
			res.json(loghandler.error)
		})
})

router.get('/tebakbendera', async (req, res, next) => {

        var bendera = JSON.parse(
            fs.readFileSync(__path + '/lib/tebakbendera.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...bendera[~~(Math.random() * bendera.length)]
         })
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/muslim/kisahnabi', async (req, res, next) => {
	var nabi = req.query.nabi

		Searchnabi(nabi)
		.then(result => {
			res.json({
				creator: creator,
				result
		})
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})

router.get('/dddtik', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.dddtik(url).then(resu => resu.download.source != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/rexdldown', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.rexdldown(url).then(resu => res.json(resu))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/snapinsta', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.snapinsta(url).then(resu => resu.result != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/igdl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await hxz.igdl(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/mediafire', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await mediafireDl(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/youtube', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await hxz.youtube(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/textpro/impressive', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-impressive-glitch-text-effects-online-1027.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/1917', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/1917-style-text-effect-online-980.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})

router.get('/textpro/whitebear', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/brokenglass', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/broken-glass-text-effect-free-online-1023.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})

router.get('/textpro/wood', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/wood-text-effect-856.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/bokeh', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/bokeh-text-effect-876.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/summer', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-a-summer-neon-light-text-effect-online-1076.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})

router.get('/textpro/icecold', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/ice-cold-text-effect-862.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/toxic', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/toxic-text-effect-online-901.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/captainamerica', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/captain-america-text-effect-905.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/3dstone', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})

router.get('/textpro/greenhoror', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-green-horror-style-text-effect-online-1036.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/dropwater', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/dropwater-text-effect-872.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/horrorblood', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/horror-blood-text-effect-online-883.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/sketch', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-a-sketch-text-effect-online-1044.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/lightglow', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/graffiti', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/magmahot', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-a-magma-hot-text-effect-online-1030.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})

router.get('/textpro/transformer', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-a-transformer-text-effect-online-1035.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/darkgold', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/metal-dark-gold-text-effect-online-939.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/thunder', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-thunder-text-effect-online-881.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/neondevil', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})
router.get('/textpro/steel', async (req, res, next) => {
  if(!req.query.text) return res.status(400).json(logHandler('text'))
  try {
    let tp = await zrapi.textpro('https://textpro.me/steel-text-effect-online-921.html', [req.query.text]), tpBuff = await getBuffer(tp)
    res.status(200).type('jpeg').send(tpBuff)
  } catch {
    res.status(500).json(loghandler.error)
    next()
  }
})

router.get('/twitter', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	let result = await hxz.twitter(url)
	try {
		res.json({
			status: 200,
			creator: `${creator}`,
			note: 'Jangan Di Tembak Bang',
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/pindl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.pinterestdl(url).then(resu => resu.result != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/soundcloud', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.soundcloud(url).then(resu => resu.link != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/goredl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
  if(!isUrl(url)) return res.json(loghandler.nurl)
	try {
		scrapper.goredl(url).then(resu => resu.data.judul != '' ? res.json(resu) : res.json(loghandler.error))
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})

router.get('/nsfw/glasses', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/inirey/result-rest-api/main/nsfw/glasses.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
router.get('/nsfw/foot', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/inirey/result-rest-api/main/nsfw/foot.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
router.get('/nsfw/ass', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/inirey/result-rest-api/main/nsfw/ass.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
router.get('/nsfw/ahegao', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/ahegao.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        router.get('/nsfw/pussy', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/pussy.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
       
       router.get('/nsfw/manga', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/manga.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        router.get('/nsfw/tentacles', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/tentacles.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
       
router.get('/nsfw/blowjob', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/blowjob.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        
        router.get('/nsfw/hentai', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/hentai.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        router.get('/nsfw/bdsm', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/bdsm.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        
router.get('/nsfw/yuri', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Zynfinity/json/main/yuri.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        router.get('/nsfw/ero', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/ero.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        
router.get('/nsfw/masturbation', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/masturbation.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        router.get('/nsfw/femdom', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/femdom.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
        router.get('/nsfw/cum', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/Handokodwi/result-rest-api/main/nsfw/cum.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })
router.get('/nsfw/gangbang', async (req, res, next) => {
	        let waifyy = (await axios.get(`https://raw.githubusercontent.com/inirey/result-rest-api/main/nsfw/gangbang.json`)).data
	        let result = waifyy[Math.floor(Math.random() * (waifyy.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/media/yuri.png', data)
            await res.sendFile(__path +'/media/yuri.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/media/yuri.png')
        })

// Searching
router.get('/pinterest', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let result = await pinterest(query)
	res.json({
		status: 200,
		creator: `${creator}`,
		note: 'Jangan Di Tembak Bang',
		result
	})
})
router.get('/happymod', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.happymod(query).then(resu => resu.data != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/android1', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.android1(query).then(resu => resu.data != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/rexdl', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.rexdl(query).then(resu => resu.result != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/muslim/asmaulhusna', async (req, res, next) => {
    

	asmaul = JSON.parse(fs.readFileSync(__path +'/lib/asmaulhusna.json'));
	res.json(asmaul)
})
router.get('/tokohindo', async (req, res, next) => {
    

	tokoindo = JSON.parse(fs.readFileSync(__path +'/lib/tokohindo.json'));
	res.json(tokoindo)
})
router.get('/apkmody', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.apkmody(query).then(resu => resu.data != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/gore', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.searchgore(query).then(resu => res.json(resu))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/chord', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	try{
    scrapper.chord(query).then(resu => res.json(resu))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/google', async (req, res, next) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let google = require('google-it')
	let result = google({
		'query': query
	}).then(result => {
		res.json({
				status: 200,
				creator: `${creator}`,
				note: 'Jangan Di Tembak Bang',
				result
			})
			.catch(e => {
				res.json(loghandler.error)
			})
	})
})
router.get('/konachan', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
  try{
    scrapper.konachan(query).then(resu => resu != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/zerochan', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
  try{
    scrapper.zerochan(query).then(resu => resu.result != '' ? res.json(resu) : res.json(loghandler.error))
  }catch{
    res.json(loghandler.error)
  }
})

// Random Image
router.get('/random/waifu', async (req, res, next) => {
	fetch(encodeURI(`https://waifu.pics/api/sfw/waifu`))
		.then(response => response.json())
		.then(async data => {
			let result = data;
			let buffer = await fetch(data.url)
			res.type('png')
			res.send(await buffer.buffer())
		})
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/random/neko', async (req, res, next) => {
	fetch(encodeURI(`https://waifu.pics/api/sfw/neko`))
		.then(response => response.json())
		.then(async data => {
			let result = data;
			let buffer = await fetch(data.url)
			res.type('png')
			res.send(await buffer.buffer())
		})
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/random/husbu', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/media/waifu.png', data)
	await res.sendFile(__path + '/media/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/media/waifu.png')
})
router.get('/random/loli', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/media/waifu.png', data)
	await res.sendFile(__path + '/media/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/media/waifu.png')
})
router.get('/random/milf', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/media/waifu.png', data)
	await res.sendFile(__path + '/media/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/media/waifu.png')
})
router.get('/random/cosplay', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/media/waifu.png', data)
	await res.sendFile(__path + '/media/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/media/waifu.png')
})
router.get('/randomgore', async (req, res, next) => {
	scrapper.randomgore().then(resu => res.json(resu))
})
router.get('/ceritahantu', async (req, res, next) => {
	scrapper.ceritahantu().then(resu => res.json(resu))
})
router.get('/randomtiktok', async (req, res, next) => {
  const user = req.query.username
  if(!user) return res.json(misparam('Username Tiktok'))
  try{
    scrapper.randomtt(user).then(async resu => {
      console.log(resu)
      if(resu.username != ''){
        await fs.writeFileSync(`./media/${user}.mp4`, await getBuffer(resu.videourl))
        await res.sendFile(__path + `/media/${user}.mp4`)
        await sleep(5000)
        fs.unlinkSync(`./media/${user}.mp4`)
      }
      else{
        res.json(loghandler.error)
      }
    })
  }catch{
    res.json(loghandler.error)
  }
})

//canvas
router.get('/welcome', async (req, res) => {
	const nama = req.query.username
	const mem = req.query.memcount
	const avatar = req.query.ppurl
	const gname = req.query.groupname
	const bg = req.query.bgurl
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!nama) return res.json(misparam('username'))
	if (!mem) return res.json(misparam('memcount'))
	if (!avatar) return res.json(misparam('ppurl'))
	if (!gname) return res.json(misparam('groupname'))
	if (!bg) return res.json(misparam('bgurl'))
	try {
		const image = await new dcanvas.Welcome()
			.setUsername(nama)
			.setDiscriminator(asi)
			.setMemberCount(mem)
			.setGuildName(gname)
			.setAvatar(avatar)
			.setColor("border", "#8015EA")
			.setColor("username-box", "#8015EA")
			.setColor("discriminator-box", "#8015EA")
			.setColor("message-box", "#8015EA")
			.setColor("title", "#8015EA")
			.setColor("avatar", "#8015EA")
			.setBackground(bg)
			.toAttachment();
		await fs.writeFileSync(`./media/welcome_${asi}.png`, image.toBuffer())
		await res.sendFile(__path + `/media/welcome_${asi}.png`)
		await sleep(3000)
		await fs.unlinkSync(`./media/welcome_${asi}.png`)
	} catch {
		return res.json(loghandler.error)
	}
})
router.get('/goodbye', async (req, res) => {
	const nama = req.query.username
	const mem = req.query.memcount
	const avatar = req.query.ppurl
	const gname = req.query.groupname
	const bg = req.query.bgurl
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!nama) return res.json(misparam('username'))
	if (!mem) return res.json(misparam('memcount'))
	if (!avatar) return res.json(misparam('ppurl'))
	if (!gname) return res.json(misparam('groupname'))
	if (!bg) return res.json(misparam('bgurl'))
	try {
		const image = await new dcanvas.Goodbye()
			.setUsername(nama)
			.setDiscriminator(asi)
			.setMemberCount(mem)
			.setGuildName(gname)
			.setAvatar(avatar)
			.setColor("border", "#8015EA")
			.setColor("username-box", "#8015EA")
			.setColor("discriminator-box", "#8015EA")
			.setColor("message-box", "#8015EA")
			.setColor("title", "#8015EA")
			.setColor("avatar", "#8015EA")
			.setBackground(bg)
			.toAttachment();
		await fs.writeFileSync(`./media/goodbye_${asi}.png`, image.toBuffer())
		await res.sendFile(__path + `/media/goodbye_${asi}.png`)
		await sleep(3000)
		await fs.unlinkSync(`./media/goodbye_${asi}.png`)
	} catch {
		return res.json(loghandler.error)
	}
})

router.get('/wasted', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.wasted(img).then(async data => {
			await canvac.write(data, `./media/wasted_${asi}.png`)
			await res.sendFile(__path + `/media/wasted_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/wasted_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/wanted', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.wanted(img).then(async data => {
			await canvac.write(data, `./media/wanted_${asi}.png`)
			await res.sendFile(__path + `/media/wanted_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/wanted_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/rip', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.rip(img).then(async data => {
			await canvac.write(data, `./media/rip_${asi}.png`)
			await res.sendFile(__path + `/media/rip_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/rip_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/sepia', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.sepia(img).then(async data => {
			await canvac.write(data, `./media/sepia_${asi}.png`)
			await res.sendFile(__path + `/media/sepia_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/sepia_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/shit', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.shit(img).then(async data => {
			await canvac.write(data, `./media/shit_${asi}.png`)
			await res.sendFile(__path + `/media/shit_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/shit_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/greyscale', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.greyscale(img).then(async data => {
			await canvac.write(data, `./media/greyscale_${asi}.png`)
			await res.sendFile(__path + `/media/greyscale_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/greyscale_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/beautiful', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.beautiful(img).then(async data => {
			await canvac.write(data, `./media/beautiful_${asi}.png`)
			await res.sendFile(__path + `/media/beautiful_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/beautiful_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/blur', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.blur(img).then(async data => {
			await canvac.write(data, `./media/blur_${asi}.png`)
			await res.sendFile(__path + `/media/blur_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/blur_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/invert', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.invert(img).then(async data => {
			await canvac.write(data, `./media/invert_${asi}.png`)
			await res.sendFile(__path + `/media/invert_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/invert_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/jokeOverHead', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.jokeOverHead(img).then(async data => {
			await canvac.write(data, `./media/jokeOverHead_${asi}.png`)
			await res.sendFile(__path + `/media/jokeOverHead_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/jokeOverHead_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/hitler', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.hitler(img).then(async data => {
			await canvac.write(data, `./media/hitler_${asi}.png`)
			await res.sendFile(__path + `/media/hitler_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/hitler_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/facepalm', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.facepalm(img).then(async data => {
			await canvac.write(data, `./media/facepalm_${asi}.png`)
			await res.sendFile(__path + `/media/facepalm_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/facepalm_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})
router.get('/circle', async (req, res) => {
	const img = req.query.url
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (!img) return res.json(misparam('img'))
	if (!isUrl(img)) return res.json(loghandler.nurl)
	canvac.Canvas.circle(img).then(async data => {
			await canvac.write(data, `./media/circle_${asi}.png`)
			await res.sendFile(__path + `/media/circle_${asi}.png`)
			await sleep(3000)
			await fs.unlinkSync(`./media/circle_${asi}.png`)
		})
		.catch(error => {
			res.json(mess.error)
		})
})

//religion
router.get('/muslim/hadits', async (req, res, next) => {
            kitab = req.query.kitab,
            nomor = req.query.nomor
	
    if (!kitab) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kitab"})
    if (!nomor) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nomor"})

       fetch(encodeURI(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`))
        .then(response => response.json())
        .then(data => {
             res.json(
             data
             )
         })
         .catch(e => {
         	res.json(loghandler.error)

})
})

router.get('/muslim/quran', async (req, res, next) => {     
            surah = req.query.surah,
            ayat = req.query.ayat
           
    if (!surah) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter surah"})
    if (!ayat) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ayat"})

       fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})

router.get('/muslim/surah', async (req, res) => {
	let query = req.query.no
  if(isNaN(query)) return res.send('Input harus berupa angka!')
	if (!query) return res.json(loghandler.notquery)
  try{
    surah = JSON.parse(fs.readFileSync('./lib/surah.json'))
    resfil = surah.filter(mek => mek.no == query)
    console.log(resfil)
    if(resfil == '') return res.json(loghandler.error)
    scrapper.surat(resfil[0].surat).then(resu => res.json(resu))
  }catch{
    res.json(loghandler.error)
  }
})

//other
router.get('/npmstalk', async (req, res, next) => { 
            query = req.query.query
           
    if (!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://registry.npmjs.org/${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})
router.get('/stalkff', async (req, res, next) => {
            userId = req.query.userId
            
    if (!userId) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter id"})

       scrapper.stalkff(userId)
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result,
                 message : `jangan lupa follow ${creator}`
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})

router.get('/jadwaltv', async(req, res) => {
  channel = req.query.channel
  if(!channel) return res.json(misparam('channel'))
  try{
    scrapper.jadwaltv(channel).then(resu => res.json(resu))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/emoji', async(req, res) => {
  emoji = req.query.emoji
  if(!emoji) return res.json(misparam('emoji'))
  try{
    scrapper.emoji(emoji).then(resu => res.json(resu))
  }catch{
    res.json(loghandler.error)
  }
})
router.get('/cekapikey', async(req, res) => {
  apikey = req.query.apikey
  if(!apikey) return res.json(misparam('sender'))
  try{
    const data = await db.collection('apikey').findOne({apikey: apikey})
    if(data != null) return res.json({...data, status: true})
    res.json({
      status: false,
      message: 'Apikey Invalid'
    })
  }catch(e){
    res.json(e)
  }
})
router.get('/hitungmundur', async (req, res) => {
        bulan = req.query.bulan
        tanggal = req.query.tanggal

    if (!bulan) return res.json({ status : false, creator : `Zynfx`, message : "masukan parameter bulan"})
    if (!tanggal) return res.json({ status : false, creator : `Zynfx`, message : "masukan parameter tanggal"})

    try {
    var countDownDate = new Date(`${bulan} ${tanggal}, 2021 00:00:00`).getTime();
        var now = new Date().getTime();

		function kurangwaktu(waktunya, waktuskrg){
			var distance = waktunya - waktuskrg;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
		}

    res.json({
         creator: 'Zynfx',
         status: true,
         code: 200,
          message: 'Follow ig : _.zynfx',
        result : kurangwaktu(countDownDate, now)
    })
    } catch (e) {
        console.log(e)
        res.json({ status : false, creator : `Zynfx`, message : "Eror, Harap Report Ke Owner"})
    }
})
router.get('/freefire', async (req, res, next) => {
            ID = req.query.ID
            
    if (!ID) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter id"})

       api.search.freefireid(ID)
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result,
                 message : `jangan lupa follow ${creator}`
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})
router.get('/getapikey', async(req, res) => {
  sender = req.query.sender
  if(!sender) return res.json(misparam('sender'))
  try{
    console.log(sender)
    const data = await db.collection('apikey').findOne({id: sender})
    console.log('p')
    if(data != null) return res.json(data)
    random = await GenerateSerialNumber("000000000000000000000000")
    console.log(random)
    await db.collection('apikey').insertOne({id: sender, apikey: random})
    res.json({
      id: sender,
      apikey: random,
      status: 'active'
    })
  }catch(e){
    res.json(e)
  }
})
router.get('/eval', async (req, res) => {
	const util = require('util')
console.log('eval')
ras = req.query.code
function _(rem) {
ren = JSON.stringify(rem,null,2)
pes = util.format(ren)
res.json(pes)
}
try{
res.send(require('util').format(eval(`(async () => { ${ras} })()`)))
} catch(err) {
e = String(err)
res.json(e)
}
})
router.use(function(req, res) {
	res.status(404)
		.set("Content-Type", "text/html")
		.sendFile(__path + '/views/404.html');
});

module.exports = router
