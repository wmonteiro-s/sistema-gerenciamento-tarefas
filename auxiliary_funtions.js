import {readFile, writeFile} from 'fs/promises'

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

function createTask(){

}

function viewAllTasks(){

}

function viewConcludedTasks(){

}

function viewNotConcludedTasks(){

}

function completeTask(){

}