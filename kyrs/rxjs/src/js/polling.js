import { faker } from '@faker-js/faker';
import { interval, map } from 'rxjs';


export default class Polling {
    constructor() {
        this.data = {
            "status": "ok",
            "timestamp": 1553400000,
            "messages": []
        }
    }

    init() {
        interval(3000)
        .pipe(
            map(() => this.createRandomUser()))
        .subscribe(res => {
            this.data.messages.push(res);
            this.render()
        });
    }

    render() {
        const messages = document.querySelector('.messages')
        messages.innerHTML = null;
        this.data.messages.forEach(i => {
            let text;
            if(i.subject.length >= 15) {
                text = `${i.subject.substring(0, 15)}...`
            } else {
                text = i.subject;
            }
            messages.insertAdjacentHTML('afterbegin', `
                <li class="message">
                    <div class="container">
                        <p class="email">${i.from}</p>
                        <p class="text">${text}</p>
                        <p class="date">${i.received}</p>
                    </div>
                </li>
            `)
        })
    }

    createRandomUser() {
        const name = faker.internet.displayName();
        const text = faker.lorem.words(Math.floor(Math.random() * 4) + 1);
        const localDateOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' }
        const date = new Date(faker.date.recent()).toLocaleDateString('ru-US', localDateOptions);
        return {
          id: faker.string.uuid(),
          from: `${name}@${faker.internet.domainName()}`,
          subject: `Hello from ${name}`,
          body: text,
          received: date,  
        };
    }
}
