/*
    Southampton University Formula Student Team
    Copyright (C) 2021 SUFST

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

import { Middleware } from 'redux';
import { removeAlert } from '../slices/alert';

// any should be rootState but I can't work out how to fix the circular dependancy issue....
export const alertMiddleware: Middleware<{}, any> = storeAPI => next => action => {
  if (action.type === 'alert/showAlert') {
    setTimeout(() => {
      storeAPI.dispatch(removeAlert());
    }, action.payload.timeout);

    return next(action);
  }

  return next(action);
};
