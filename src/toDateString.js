function _toDate(date) {
    let newDate = new Date(date);
    let day = newDate.getUTCDate();
    day = day >= 10 ? day : '0'+day;
    let month = newDate.getUTCMonth()+1;
    month = month >= 10 ? month : '0'+month;
    let year = newDate.getUTCFullYear();
    if(year<10)
        year = '000' + year;
    else if(year <100)
        year = '00'+year;
    else if(year < 1000)
        year = '0'+year;
    return `${year}-${month}-${day}`;
}
export default _toDate;