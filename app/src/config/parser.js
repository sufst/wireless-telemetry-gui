
export const parseData = (stringData) => {

    const pduType = stringData['1']; 

    if (pduType == '1') {
        console.log('Successfully sent AIPDU');
        return 
    }

    if (pduType == '2') {
        //console.log('ACPDU', stringData);
        const speed = stringData['12'];
        carSpeed(speed)
        return speed;
    }
}

const carSpeed = (speed) => {
    //console.log('Speed: ', speed);
    return (speed);
}