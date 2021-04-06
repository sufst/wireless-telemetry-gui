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
export function trimData (data, expiredS) {
    const epoch = new Date().valueOf() / 1000.0;

    return data.filter(x => x.epoch > epoch + expiredS)
}

export function convertDataToGraphData(data) {
    return data.map(x => {
        const date = (new Date(x.epoch * 1000));
        const time = date.toTimeString().split(" ")[0] + ":" + date.getMilliseconds();
        return {time: time, value: x.value}
    });
}