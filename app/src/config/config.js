
// Initial AIPDU Sent to the Server
const _AIPDU = {
	"1": 1,
	"2": 1,
	"3": 23,
	"5": 3,
	"6": 10000,
	"7": "GUI"
};

// Net requires a Buffer to send via the socket so we convert the _AIPDU object to a Buffer. 
export const AIPDU = JSON.stringify(_AIPDU); 

// Port of the back-end server
export const PORT = 19900; 

// Host of the back-end server
export const HOST = 'localhost'; 