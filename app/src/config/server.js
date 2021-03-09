export const parseServerData = (message) => {
    
    const data  = JSON.parse(message.data); 
    
    const core = data.Core
    const aero = data.Aero
    const diagnostic = data.Diagnostic
    const misc = data.misc
    const power = data['Power Train']

    return core.rpm
}

export const ENDPOINTS = {
    TEST: 'GET /sensors?amount=', 
    GET_SINCE: `GET /sensors?timesince=`, 
    GET: 'GET /sensors?amount=20'
}

export const sendServerRequest = (socket) => {
    let epochNow = Math.round(Date.now() / 1000); 
    let five_seconds_ago = epochNow - 1; 

    socket.send(`GET /sensors?timesince=${five_seconds_ago}`)
}