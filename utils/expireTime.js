function getExpireTime(){
    let date = new Date();
    date.setSeconds(date.getSeconds() + 60);
    return date.valueOf();
}

module.exports = getExpireTime;