let values = {

}

export const parseServerData = (message) => {
    const data  = JSON.parse(message.data); 
    
    const core = data.Core
    values.core = core; 
    
    const aero = data.Aero
    values.aero = aero
    
    const diagnostic = data.Diagnostic
    values.diagnostic = diagnostic

    const power = data['Power Train']
    values.power = power

    const susp = data.Suspension
    values.suspension = susp

    const misc = data.misc
    values.misc = misc

    return values
}