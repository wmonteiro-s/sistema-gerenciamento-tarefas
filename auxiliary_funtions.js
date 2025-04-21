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
    log(tasks)
}

await viewAllTasks()

async function viewConcludedTasks(){
    const tasks = await loadTasks()

    const concludedTasks = tasks.filter(task => task.concluded)

    tasks.length 
    ? concludedTasks.length 
        ? log(concludedTasks) 
        : log('Nenhuma tarefa foi concluída') 
    : log('Não há nenhuma tarefa cadastrada')
}

// await viewConcludedTasks()

async function viewNotConcludedTasks(){
    const tasks = await loadTasks()

    const inconcludedTasks = tasks.filter(tasks => !tasks.concluded)

    tasks.length 
    ? inconcludedTasks.length 
        ? log(inconcludedTasks)
        : log('Todas as tarefas foram concluídas')
    : log('Não há nenhuma tarefa cadastrada')
}

// await viewNotConcludedTasks()

function idExists(id, tasks){
    const tasksId = tasks.map(task => task.id)
    const foundId = tasksId.find(value => value === id)

    return foundId
}

async function concludeTask(){
    const tasks = await loadTasks()

    const id = +prompt('Digite o ID da tarefa que deseja marcar como CONCLUÍDA: ')
    
    tasks.length && idExists(id, tasks)
    ? tasks[id - 1].concluded 
        ? log('A tarefa já está CONCLUÍDA') 
        : (
            tasks[id - 1].concluded = true,
            log('Tarefa marcada como CONCLUÍDA')
          )
    : log('Não há nenhuma tarefa cadastrada')

    await saveTasks(tasks)
}

await concludeTask()