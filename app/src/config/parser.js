//
// Enum of PDU Types returned from server. Example: '1' is AIPDU. 
//
// 1. Application Initial PDU (AIPDU)
// 2. Application Core PDU (ACPDU) 
// 3. Application Aero PDU (AAPDU)
// 4. Application Diagnostic PDU (ADPDU)
// 5. Application Power-Train PDU (APPDU)
// 6. Application Suspension PDU (ASPDU)
// 7. Application Misc PDU (AMPDU)
//

//
// Enum Types for ACPDU (Core)
// 1. PDU Type - In this case 2. 
// 12. Car Speed 
//

export const parseData = (stringData) => {

    const pduType = stringData['1']; 

    let data = {
        speed: 0,
        rpm: 0,
        water_temp: 0, 
    }

    if (pduType == '1') {
        console.log('Successfully sent AIPDU');
        return 
    }

    if (pduType == '2') {
        console.log('Received: Core ACPDU');
        console.log(stringData);
        
        const speed = stringData['12'];
        data.speed = speed

        const rpm = stringData['5'];
        data.rpm = rpm

        const water_temp = stringData['6'];
        data.water_temp = water_temp
        
        return data; 
    }

    if (pduType == '3') {
        //console.log('Received: Aero AAPDU');
        return 
        //console.log('ACPDU', stringData);
        //const speed = stringData['12'];
        //carSpeed(speed)
        //return speed;
    }

    if (pduType == '4') {
        //console.log('Received: Diagnostics ADPDU');
        return 
        //console.log('ACPDU', stringData);
        //const speed = stringData['12'];
        //carSpeed(speed)
        //return speed;
    }

    if (pduType == '5') {
        //console.log('Received: Powertrain APPDU');
        return 
        //console.log('ACPDU', stringData);
        //const speed = stringData['12'];
        //carSpeed(speed)
        //return speed;
    }

    if (pduType == '6') {
        //console.log('Received: Suspension ASPDU');
        return 
        //console.log('ACPDU', stringData);
        //const speed = stringData['12'];
        //carSpeed(speed)
        //return speed;
    }

    if (pduType == '7') {
        //console.log('Received: Misc AMPDU');
        return 
        //console.log('ACPDU', stringData);
        //const speed = stringData['12'];
        //carSpeed(speed)
        //return speed;
    }
}