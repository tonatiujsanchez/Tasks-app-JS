const tasksList = document.querySelector('.tasks');
const inputTask = document.querySelector('.form__input');
const form      = document.querySelector('.form');
const btnForm   = document.querySelector('.form__btn');

let taskEnter = {
    id: null,
    name: '',
    complete: false
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    newTask();
});


const tasks = [
    {
        id: 'Sat Jan 08 2022 03:33:58 GMT-0600 (hora estándar central)',
        name: 'Comprar pan',
        complete: false
    },
    {
        id: 'Sat Jan 08 2022 03:33:60 GMT-0600 (hora estándar central)',
        name: 'Comprar café',
        complete: true
    },
    {
        id: 'Sat Jan 08 2022 03:33:61 GMT-0600 (hora estándar central)',
        name: 'Comprar jabon',
        complete: false
    },
    {
        id: 'Sat Jan 08 2022 03:33:62 GMT-0600 (hora estándar central)',
        name: 'Comprar carne',
        complete: false
    }
];

function loadTasks(){
    tasks.forEach( task =>{
        addTask( task );
    })
}

function addTask( task ){
    let liItem = document.createElement('li');
            liItem.classList.add( 'tasks__item' );
            if( task.complete ){
                liItem.classList.add( 'complete' );
            }

        const spanRadio = document.createElement('span');
            spanRadio.classList.add('tasks__radio');
        const iRadio = document.createElement('i');
        if( task.complete ){
            iRadio.classList.add('bx', 'bxs-check-circle');
        }else{
            iRadio.classList.add( 'bx', 'bx-check-circle' );
        }

        spanRadio.addEventListener('click', () =>{ toggleTask( task ) });

        const spanName = document.createElement('span');
            spanName.classList.add('tasks__title');
            spanName.innerText = task.name;    

        const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn-icon','tasks__edit');
            btnEdit.innerHTML = "<i class='bx bx-edit'></i>";
            btnEdit.addEventListener('click', () => editTask(task) );

        const btnTrash =  document.createElement( 'button' );
            btnTrash.classList.add('btn-icon','tasks__trash');
            btnTrash.innerHTML = "<i class='bx bx-trash'></i>";
            btnTrash.addEventListener('click', () => removeTask( task ));
        


        spanRadio.appendChild( iRadio );
        liItem.appendChild( spanRadio );
        liItem.appendChild( spanName );
        liItem.appendChild( btnEdit );
        liItem.appendChild( btnTrash );
        tasksList.appendChild( liItem );
}

function newTask(){
    if( (inputTask.value).trim() === '' ){
        console.log('Ingresa una tarea.');
        return;
    }

    if( !(taskEnter.id) ){
        const task = {
            id: String(new Date()),
            name: inputTask.value,
            complete: false
        }
    
        tasks.push( task );
        addTask( task );
        inputTask.value = '';
    }else{
        const taskItems = document.querySelectorAll('.tasks__item');

        tasks.forEach( (item, idx)=>{
            if( item.id === taskEnter.id ){
                taskItems[idx].childNodes[1].innerText = inputTask.value;
                tasks[idx].name = inputTask.value;
                inputTask.value = '';
                btnForm.innerText = 'Agregar';
            }
        });

        taskEnter = {
            id: null,
            name: '',
            complete: false
        }
    }


}


function toggleTask(task) {
    const taskItems = document.querySelectorAll('.tasks__item');
    tasks.forEach( (item, idx) =>{
        if( item.id === task.id ){
            taskItems[idx].classList.toggle( 'complete' );
            taskItems[idx].childNodes[0].childNodes[0].classList.toggle('bx-check-circle');
            taskItems[idx].childNodes[0].childNodes[0].classList.toggle('bxs-check-circle');
        }
    });
}

function editTask(task) {
    inputTask.value = task.name;
    btnForm.innerText = 'Editar';
    taskEnter = { ...task }
}

function removeTask(task){
    const taskItems = document.querySelectorAll('.tasks__item');

    tasks.forEach((item, idx) => {
        if( item.id === task.id ){
            tasks.splice( idx, 1 );
            taskItems[idx].remove();
        }    
    });

};


loadTasks();
