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
        concluded: false
    }
    tasks.push(newTask)
    await saveTasks(tasks)
    log('Tarefa criada com sucesso!')
}

// await createTask()

async function viewAllTasks(){
    const tasks = await loadTasks()
    
    if(!tasks.length) { log('Não há nenhuma tarefa cadastrada'); return }

    log(tasks)
}

await viewAllTasks()

async function viewConcludedTasks(){
    const tasks = await loadTasks()

    if(!tasks.length) { log('Não há nenhuma tarefa cadastrada'); return }

    const concludedTasks = tasks.filter(task => task.concluded)

    concludedTasks.length ? log(concludedTasks) : log('Nenhuma tarefa foi concluída')
}

// await viewConcludedTasks()

async function viewNotConcludedTasks(){
    const tasks = await loadTasks()

    if(!tasks.length) { log('Não há nenhuma tarefa cadastrada'); return }

    const inconcludedTasks = tasks.filter(tasks => !tasks.concluded)

    inconcludedTasks.length ? log(inconcludedTasks) : log('Todas as tarefas foram concluídas')
}

// await viewNotConcludedTasks()

function idExists(id, tasks){
    const tasksId = tasks.map(task => task.id)
    const foundId = tasksId.find(value => value === id)

    return foundId
}

async function concludeTask(){
    const tasks = await loadTasks()

    if (!tasks.length) { log('Não há nenhuma tarefa registrada'); return }

    const id = +prompt('Digite o ID da tarefa que deseja marcar como CONCLUÍDA: ')
    
    if (!idExists(id, tasks)) { log('O ID informado não existe'); return }

    const task = tasks[id - 1]

    task.concluded ? log('A tarefa já está CONCLUÍDA') : (task.concluded = true, log('Tarefa marcada como CONCLUÍDA'))

    await saveTasks(tasks)
}

await concludeTask()