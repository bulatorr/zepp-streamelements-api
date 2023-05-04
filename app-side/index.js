import { MessageBuilder } from '../shared/message'

const messageBuilder = new MessageBuilder()

function parse(emote) {
	let st = ''
	for (var i = 0; i < 10; i++) {
		st += `${i+1}. ${emote[i]['emote']}: ${emote[i]['amount']}\n`
	}
	return st
}
const fetchData = async (ctx) => {
  try {
	const res = await fetch({
		url: 'https://api.streamelements.com/kappa/v2/chatstats/global/stats',
		method: 'GET'
	})
	.then(response => response.json())
	.then(emotes => emotes['twitchEmotes'])
	.then(twitchEmotes => parse(twitchEmotes))
    ctx.response({
		data: {
			result: {
				text: res
			}
		},
    })
  } catch (error) {
    ctx.response({
      data: { result: {text: 'error!'} },
    })
  }
}

AppSideService({
  onInit() {
    messageBuilder.listen(() => {})

    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA') {
        return fetchData(ctx)
      }
    })
  }
})
