/*
    Southampton University Formula Student Team
    Copyright (C) 2021 Nathan Rowley-Smith

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
// import {
//     createContext, 
//     useContext, 
//     useReducer 
// } from 'react';

// export const UserStore = createContext();

// function UserStoreReducer(state, action) {
//     const temp = {...state};

//     switch(action.type) {
//         case "update":
//             temp[action.key] = action.value;
//             return temp;
//         default:
//             throw new Error();
//     }
// }

// export function useUserStoreReducer() {
//     return useReducer(UserStoreReducer, {
//         username: undefined,
//         meta: {

//         }
//     });
// }

// export function useUserStoreDispatcher() {
//     return useContext(UserStore).dispatch;
// }

// export function useUser() {
//     return useContext(UserStore).state;
// }
