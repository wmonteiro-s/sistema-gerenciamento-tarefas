import {readFile, writeFile} from 'fs/promises'
import PromptSync from 'prompt-sync'
const prompt = PromptSync()
const log = console.log

const FILE_NAME = 'tasks.json'

async function loadTasks() {
    try {
        const dados = await readFile(FILE_NAME, 'utf-8')
        return JSON.parse(dados)
    } catch (error) {
        console.error('Erro ao carregar arquivo', error)
    }
}

async function saveTasks(task) {
    try {
        await writeFile(FILE_NAME, JSON.stringify(task, null, 2))
    } catch (error) {
        console.error('Erro ao salvar tarefa', error)
    }
}

function generateNewID(tasks){
    const ids = tasks.map(task => task.id)

    const descendingIds = ids.sort((a, b) => b - a)

    return ids.length ? ++descendingIds[0] : 1
}

async function createTask(){
    const title = prompt('Insira um título para a tarefa: ')
    const description = prompt('Insira uma descrição para a tarefa: ')
    const tasks = await loadTasks()
    const newTask = {
        id: generateNewID(tasks),
        title: title,
        description: description,
        completed: false
    }
    tasks.push(newTask)
    await saveTasks(tasks)
    log('Tarefa criada com sucesso!')
}

await createTask()

function viewAllTasks(){

}

function viewConcludedTasks(){

}

function viewNotConcludedTasks(){

}

function completeTask(){

}