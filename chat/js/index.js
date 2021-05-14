;((doc, Socket, storage) => {
  const oList = doc.querySelector('#list')
  const oMsg = doc.querySelector('#message')
  const oSendBtn = doc.querySelector('#send')
  let username = ''

  const ws = new Socket('ws:localhost:8000')

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    oSendBtn.addEventListener('click', handleSendBtnClick, false)
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    // 接受消息
    ws.addEventListener('message', handleMessage, false)
  }

  function handleSendBtnClick() {
    const msg = oMsg.value

    if (!msg.trim.length) return

    ws.send({user: usename})
  }

  function handleOpen(e) {
    console.log('webSocket open', e)
    username = storage.getItem('username')
    
    if (!username) {
      location.href = 'entry.html'
      return
    }
  }

  function handleClose(e) {
    console.log('webSocket close', e)
  }

  function handleError(e) {
    console.log('webSocket error', e)
  }

  function handleMessage(e) {
    console.log('webSocket message', e)
  }

  init()
})(document, WebSocket, localStorage, location);