export const parseServerData = (message) => {
    
    const data  = JSON.parse(message.data); 
    
    const core = data.Core
    const aero = data.Aero
    const diagnostic = data.Diagnostic
    const misc = data.misc
    const power = data['Power Train']

    console.log(core);
}