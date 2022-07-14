const input = document.querySelector('#text')

const selectType = document.querySelector('#select')

const listTask = document.querySelector('.list')

const bntAddtask = document.querySelector('#add')

const mainContent = document.querySelector('.container')

if (bntAddtask) {
    bntAddtask.addEventListener('click', function (e) {
        e.preventDefault()
        if (selectType.value != "") {
            createObjTask(input.value, selectType.value)
            listingTasks(tasks, listTask)


        }
        input.value = ""
        selectType.value = ""
    })
}



function createObjTask(title, type) {
    if (title.trim()) {
        let priority = 0

        if (type.trim() === "urgente") {
            priority = 1
        } else if (type.trim() === "prioritário") {
            priority = 2
        } else {
            priority = 3
        }

        let obj = {
            prioridade: priority,
            titulo: title.trim(),
            tipo: type.trim()
        }
        if (tasks.includes(obj) == false) {
            tasks.push(obj)
        }


    }

}


function createTaskCard(arrTasks, listItem) {


    arrTasks.forEach((task, idx) => {


        let li = document.createElement('li')
        li.classList.add('task-card')
        li.innerHTML = `
        <div>
        <span id="${veryfyPriorityTask(task.tipo)}"></span>
        <p>${task.titulo}</p>
        </div>
        <button id="${idx}">✖</button>
        `
        listItem.appendChild(li)
    })
}

function veryfyPriorityTask(tyeValue) {
    if (tyeValue.toLowerCase() == "urgente") {
        return "urgent"
    } else if (tyeValue.toLowerCase() == "prioritário") {
        return "priority"
    } else if (tyeValue.toLowerCase() == "normal") {
        return "normal"
    }
}

function listingTasks(arrTasks, listItem) {

    clearTasks(listItem)

    console.log(arrTasks);
    let nArrTask = arrTasks.sort((a, b) => {
        return a.prioridade - b.prioridade
    })
    createTaskCard(nArrTask, listItem)

}

const btn = document.querySelector('.task-list button img')

listTask.addEventListener('click', function (e) {
    let btnRemove = e.target
    if (btnRemove.tagName == 'BUTTON') {
        tasks.splice(btnRemove.id, 1)
        listTask.innerHTML = ''
        listingTasks(tasks, listTask)
    }

})

const btnSrc = document.querySelector('#src')
const inputSrc = document.querySelector('#searchInput')
const srcList = document.querySelector('.resultSearch ')
srcList.id = "show"

const listSrc = document.querySelector('.listSrc')

const closeSrc = document.querySelector('.resultSearch a')
console.log(closeSrc);
btnSrc.addEventListener("click", function (e) {
            e.preventDefault()
            if (inputSrc.value == "") {
                srcList.innerHTML = ""

            } else {
                if (tasks.length > 0) {

                    const searchResult = []
                    srcList.removeAttribute('id')
                    for (let i = 0; i < tasks.length; i++) {

                        let str = tasks[i].titulo
                        if (str.toLowerCase().includes(inputSrc.value.toLowerCase())) {
                            console.log(str);

                            searchResult.push(tasks[i])
                        }

                    }

                    listingTasks(searchResult, listSrc)
                    inputSrc.value = ""
                }
            }})

        closeSrc.addEventListener('click', function () {
            srcList.id = "show"
            listSrc.innerHTML = ""
        })




        function clearTasks(ulList) {
            ulList.innerHTML = ""
        }