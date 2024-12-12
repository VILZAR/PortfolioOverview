export default class TaskManager {
    constructor() {
        this.arr = {
            'todo': [1],
            'inProgress': [],
            'done': [],
        }
        this.btn = `
            <button class="openInput">🞢 Add another card</button>
        `;
        this.form = `
            <form class = "taskForm">
                <textarea class = "taskText" placeholder = "Создайте заметку..." required></textarea>
                <div class = "controlInput">
                    <div>
                        <button class="addCard">Add card</button>
                        <button class="closeInput">🗙</button>
                    </div>
                    <div class="file-container">
                        <input class="fileInput" type="file" accept="image/*">
                        <span class="overlap">···</span>
                    </div>
                </div>
            </form>
                
        `;
    }
    
    save(task, key) {
        if(!this.arr[key].includes(task)) {
            this.arr[key].push(task);
        }
    }

    render() {
        if(document.querySelector('.task')) {
            document.querySelectorAll('.task').forEach(i => i.remove())
        }
        for(let key in this.arr) {
            this.arr[key].forEach(i => {
                document.querySelector(`.${key} h4`).insertAdjacentHTML('afterend', `
                    <li class="task">
                        <button class="delete">🗙</button>
                        <p>${i}</p>
                    </li>
                `)
            });
            
        }
    }
}

