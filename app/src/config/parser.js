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
// 1: PDU Type - In this case 2. 
// 5: RPM
// 6: Water Temp
// 7: TPS
// 8: Battery 
// 9: External 5V 
// 10: Fuel Flow
// 11: Lambda 
// 12: Car Speed 
//

export const parseData = (stringData) => {

    const pduType = stringData['1']; 

    let data = {
        type: -1
    }

    if (pduType == '1') {
        console.log('Successfully received AIPDU');
        data.type = 1;
        return data; 
    }

    // TODO: Refactor each PDU on its own function. 
    if (pduType == '2') {
        data.type = 2; 

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
        data.type = 3; 
        return data; 
    }

    if (pduType == '4') {
        data.type = 4; 
        return data;
    }

    if (pduType == '5') {
        data.type = 5; 
        return data;
    }

    if (pduType == '6') {
        data.type = 6; 
        return data;
    }

    if (pduType == '7') {
        data.type = 7; 
        return data;
    }
}