const formatDate = (epoch) => {
    // From the following post: 
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    
    let date = new Date(epoch * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}

export const parseServerData = (message) => {
    let values = {}

    const data  = JSON.parse(message.data).result; 

    Object.keys(data).forEach(group => {
        Object.keys(data[group]).forEach(sensor => {
            Object.keys(data[group][sensor]).forEach(entry => {
                const epoch = data[group][sensor][entry].time
                data[group][sensor][entry].time = formatDate(epoch)
             })
        })
    }) 
    
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

    const misc = data.Misc
    values.misc = misc

    return values
}