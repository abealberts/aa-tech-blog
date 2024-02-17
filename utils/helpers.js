var moment = require('moment');

module.exports = {
    formatDate: (date) => {

        if (moment) {
            dateFormat = "MMMM DD - YYYY";
            return moment(date).format(dateFormat);
        } else {
            return date;
        }
    }
}