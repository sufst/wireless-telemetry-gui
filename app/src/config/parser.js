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

//
// Enum Types for AAPDU (Aero)
// 1: PDU Type - In this case 3. 
// 5:  Evo Scanner 1
// 6:  Evo Scanner 2
// 7:  Evo Scanner 3
// 8:  Evo Scanner 4
// 9:  Evo Scanner 5 
// 10: Evo Scanner 6
// 11: Evo Scanner 7
//


//
// Parses all incoming date from the back-end server.
// 
// @param oldData: The existing data 
// @param newData: The new data sent from the server
// 
// @return data: object containing all data (old & new) plus PDU type. 
//

const MAX_GRAPH_VALUES = 20; 

const correctSizeArray = (input) => {
    if (input.length > MAX_GRAPH_VALUES) {
        input.shift(); 
    }
    return input; 
}

export const parseData = (oldData, newData) => {
    const pduType = newData['1']; 

    let data = {
        type: -1,
    }

    if (pduType == '1') {
        console.log('Successfully received AIPDU');
        return data; 
    }

    if (pduType == '2') {
        data.type = 2; 
        
        const rpm = newData['5'];
        data.rpm = [...correctSizeArray(oldData.core.rpm), rpm]

        const water_temp = newData['6'];
        data.water_temp = [...correctSizeArray(oldData.core.water_temp), water_temp]
        
        const tps = newData['7'];
        data.tps = [...oldData.core.tps, tps]
        
        const battery_mv = newData['8'];
        data.battery_mv = [...correctSizeArray(oldData.core.battery_mv), battery_mv]
        
        const external_5v_mv = newData['9'];
        data.external_5v_mv = [...correctSizeArray(oldData.core.external_5v_mv), external_5v_mv]
        
        const fuel_flow = newData['10'];
        data.fuel_flow = [...correctSizeArray(oldData.core.fuel_flow), fuel_flow]
        
        const lambda = newData['11'];
        data.lambda = [...correctSizeArray(oldData.core.lambda), lambda]
        
        const speed = newData['12'];
        data.speed = [...correctSizeArray(oldData.core.speed), speed]

        return data; 
    }

    if (pduType == '3') {
        data.type = 3; 

        const evo_1 = newData['5']; 
        data.evo_1 = [...correctSizeArray(oldData.aero.evo_1), evo_1]; 

        const evo_2 = newData['6'];
        data.evo_2 = [...correctSizeArray(oldData.aero.evo_2), evo_2]; 

        const evo_3 = newData['7'];
        data.evo_3 = [...correctSizeArray(oldData.aero.evo_3), evo_3]; 

        const evo_4 = newData['8'];
        data.evo_4 = [...correctSizeArray(oldData.aero.evo_4), evo_4]; 

        const evo_5 = newData['9'];
        data.evo_5 = [...correctSizeArray(oldData.aero.evo_5), evo_5]; 

        const evo_6 = newData['10'];
        data.evo_6 = [...correctSizeArray(oldData.aero.evo_6), evo_6]; 

        const evo_7 = newData['11'];
        data.evo_7 = [...correctSizeArray(oldData.aero.evo_7), evo_7]; 

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

    return data;
}
