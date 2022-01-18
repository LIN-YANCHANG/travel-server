const time = {}

// 產生亂數===>為了交易序號等等

let num = Math.floor(Math.random() * 1000)

// 時間格式
const timeFormat = (format, nowTime) => {
    let date = nowTime ? new Date(nowTime) : new Date()

    const add_0 = time => {
        if (time.toString().length < 2) {
            return add_0('0' + time)
        }
        return time
    }

    let today = {
        Y: date.getFullYear(),
        // 民國
        y: date.getFullYear() - 1911,
        M: add_0(date.getMonth() + 1),
        D: add_0(date.getDate()),
        h: add_0(date.getHours()),
        m: add_0(date.getMinutes()),
        s: add_0(date.getSeconds()),
        // f: date.getMilliseconds()
    }
    // ex:2020年11月22日分解 ==> y年m月d日 ， 之後再重組起來  split完會以陣列的方式呈現
    return format.split('').map(name => today[name] || name).join('')
    // name=>{return today[name] || name}
    // name=>({k:today[name] || name})
}

// XXXX-XX-XX xx:xx:xx
time.GetAll = () => timeFormat('Y-M-D h:m:s')

// xx:xx:xx
time.GetTime = () => timeFormat('h:m:s')

// xx:xx
time.GetTimes = () => timeFormat('h:m')

// XXXX-XX-XX  nowTime預設為null 有值的話就會傳遞  nowTime為變化的時間
time.GetDate = (nowTime = null) => timeFormat('Y-M-D', nowTime)



// 17碼的ID
time.GetID = () => `$${timeFormat('YMDhms')}${num}`

time.GetNo = () => `#${timeFormat('YMDhms')}${num}`

// 取得這週日期 ===> 以星期一為開頭
time.GetWeek = (set) => {
    let day = new Date(set);
    // let nowdayStart = day.getDate() - day.getDay() + 1;
    // let nowdayEnd = day.getDate() + (7 - day.getDay());
    let nowSearch = [];
    for (let i = 0; i <= 7; i++) {
        day.setDate(i);
        let week = `${day.getFullYear()}年${day.getMonth()}月${day.getDate()}日`;
        nowSearch.push(week);
    }
    return nowSearch
}

// 取得上週日期 ===> 以星期一為開頭
time.GetLastWeek = (set) => {
    let day = new Date(set);
    let lastdayStart = day.getDate() - day.getDay() - 6;
    let lastdayEnd = day.getDate() - day.getDay();
    let lastSearch = [];
    for (let i = lastdayStart; i <= lastdayEnd; i++) {
        day.setDate(i);
        let week = `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`;
        lastSearch.push(week);
    }
    return lastSearch
}
module.exports = time

