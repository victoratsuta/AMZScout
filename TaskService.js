export class TaskService {

    constructor(size, limit, renderCallback, textArray) {
        this.size = size;
        this.limit = limit;
        this.renderCallback = renderCallback;
        this.textArray = textArray;
        this.currentIndex = 0;
        this.randomArray = [];
    }

    run() {

        this.randomArray = this.generate();

        let flow = [];
        for (let i = 0; i < this.limit; i++) {
            flow.push(this.runTask())
        }

        Promise.all(flow);
    }

    mapper(string, index) {
        return new Promise((resolve) => setTimeout(() => {

            const title = 'TITLE - ' + index + ' ' + string;
            const text = 'TEXT - ' + this.textArray[index];

            this.renderCallback(title, text)
            resolve();

        }, Math.round(Math.random() * 100) + 2000))
    };

    async runTask() {

        let next = this.randomArray.pop();
        if (!next) return;

        this.currentIndex +=1;

        await this.mapper(next, this.currentIndex);
        await this.runTask();
    };

    generate() {

        const randomStr = (len, arr) => {
            let ans = '';
            for (let i = len; i > 0; i--) {
                ans +=
                    arr[Math.floor(Math.random() * arr.length)];
            }
            return ans;
        }

        const randomIntFromInterval = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let data = [];
        for (let i = 0; i < this.size; i++) {
            const randomInt = randomIntFromInterval(10, 200);
            data.push(randomStr(randomInt, '12345abcde'));
        }

        return data;
    }
}
