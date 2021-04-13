export default (state, action) => {
   switch (action.type) {
      case "SET_ALERT":
         return action.payload 
      case "REMOVE_ALERT": 
         return action.payload
      default:
         return state
   }
}