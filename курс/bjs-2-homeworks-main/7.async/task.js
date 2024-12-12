class AlarmClock {
    alarmCollection = [];
    constructor(alarmCollection, intervalId) {
        this.alarmCollection = alarmCollection;
        this.intervalId = intervalId;
    }
    addClock(alarmTime, func) {
        if (alarmTime || func == undefined) {
            throw new Error('Отсутствуют обязательные аргументы')
        }
        if (alarmCollection.includes(alarmTime)) {
            console.warn('Уже присутствует звонок на это же время')
        } else {
        let alarm = {
            callback: func(),
            time: alarmTime,
            canCall: true
        };
        alarmCollection.push(alarm);
        }
    }
    removeClock(time) {
        alarmCollection = alarmCollection.filter((alarms) => alarms !== time);
    }
    getCurrentFormattedTime() {
        let currentTime = new Date();
        hours = currentTime.getHours();
        minutes = currentTime.getMinutes();
        return '${hours}:${minutes}';
    }
    start() {
        if(this.intervalId !== undefined) {
            return;
        } else {
            this.intervalId = setInterval(() => {
                alarmCollection.forEach((i) => {
                    if(i.time == getCurrentFormattedTime() && i.canCall == true) {
                        i.canCall = false;
                        i.callback();
                    }
                })
            }, 1000);
        }
    }
    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    resetAllCalls() {
        alarmCollection.forEach((i) => {
            i.canCall = true;
        })
    }
    cleanAlarms() {
        stop();
        alarmCollection = [];
    }
}