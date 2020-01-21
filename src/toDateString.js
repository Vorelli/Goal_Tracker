import {formatISO9075} from 'date-fns';
function _toDate(date) {
    return formatISO9075(new Date(date), {representation: 'date'})
}
export default _toDate;