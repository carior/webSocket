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

    if (!msg.trim().length) return
    
    ws.send(JSON.stringify({
      user: username,
      dataTime: new Date().getTime(),
      message: msg
    }))

    oMsg.value = ''
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
    const msgData = JSON.parse(e.data)
    oList.appendChild(createMsg(msgData))
  }

  function createMsg(data) {
    const {user, dataTime, message} = data
    const oItem = doc.createElement('li')
    oItem.innerHTML = `
      <p>
        <span>${user}<span/>
        <span>${new Date(dataTime)}<span/>
        <span>${message}<span/>
      </p>
    `
    return oItem
  }

  init()
})(document, WebSocket, localStorage, location);