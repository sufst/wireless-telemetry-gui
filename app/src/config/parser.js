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
// 5. RPM
// 6. Water Temp
// 7. TPS
// 8. Battery 
// 9. External 5V 
// 10. Fuel Flow
// 11. Lambda 
// 12. Car Speed 
//

export const parseData = (stringData) => {

    const pduType = stringData['1']; 

    let data = {
        speed: 0,
        rpm: 0,
        water_temp: 0, 
        battery_mv: 0,
        external_5v_mv: 0,
		fuel_flow: 0,
        tps: 0, 
		lambda: 0
    }

    if (pduType == '1') {
        console.log('Successfully received AIPDU');
        return 
    }

    // TODO: Refactor each PDU on its own function. 
    if (pduType == '2') {
        //console.log('Received: Core ACPDU');

        const rpm = stringData['5'];
        data.rpm = rpm

        const water_temp = stringData['6'];
        data.water_temp = water_temp

        const tps = stringData['7'];
        data.tps = tps

        const battery_mv = stringData['8'];
        data.battery_mv = battery_mv

        const external_5v_mv = stringData['9'];
        data.external_5v_mv = external_5v_mv

        const fuel_flow = stringData['10'];
        data.fuel_flow = fuel_flow

        const lambda = stringData['11'];
        data.lambda = lambda

        const speed = stringData['12'];
        data.speed = speed
        
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