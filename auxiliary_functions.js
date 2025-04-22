import {readFile, writeFile} from 'fs/promises'
import PromptSync from 'prompt-sync'

const prompt = PromptSync()
const log = console.log

const FILE_NAME = 'tasks.json' // Nome do arquivo onde as tarefas são salvas

// Carrega as tarefas do arquivo JSON, retorna array vazio em caso de erro
async function loadTasks() {
    try {
        const dados = await readFile(FILE_NAME, 'utf-8')
        return JSON.parse(dados)
    } catch (error) {
        console.error('Erro ao carregar arquivo', error)
    }
}

// Salva o array de tarefas no arquivo JSON
async function saveTasks(task) {
    try {
        await writeFile(FILE_NAME, JSON.stringify(task, null, 2))
    } catch (error) {
        console.error('Erro ao salvar tarefa', error)
    }
}

// Gera um novo ID sequencial baseado nas IDs existentes
function generateNewID(tasks){
    const ids = tasks.map(task => task.id)

    const descendingIds = ids.sort((a, b) => b - a)

    return ids.length ? ++descendingIds[0] : 1
}

// Formata uma tarefa para exibição no terminal; showStatus controla exibição do status
function formatTask(task, showStatus = true){
    return `
======================== TAREFA ${task.id} ========================
ID: ${task.id}
Título: ${task.title}
Descrição: ${task.description}
${showStatus ? `Status: ${task.concluded ? '[✓] CONCLUÍDA' : '[X] NÃO CONCLUÍDA'}` : ''}
==========================================================
`
}

// Permite criar tarefas repetidamente até o usuário decidir parar
async function createTask(){
    let control
    do{
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

        const showNewTask = prompt('Deseja visualizar a nova tarefa criada (S/N)? ').toLowerCase()
        if(showNewTask === 's' || showNewTask === 'sim') {
            log(formatTask(newTask, false))
        }
        
        control = prompt('Deseja criar outra tarefa (S/N)? ').toLowerCase()
    } while (control === 's' || control === 'sim')
}

// Exibe todas as tarefas existentes formatadas
async function viewAllTasks(){
    const tasks = await loadTasks()

    if(!tasks.length) { log('Não há nenhuma tarefa cadastrada'); return }

    tasks.forEach(task => log(formatTask(task)))
}

// Exibe apenas as tarefas concluídas
async function viewConcludedTasks(){
    const tasks = await loadTasks()

    if(!tasks.length) { log('Não há nenhuma tarefa cadastrada'); return }

    const concludedTasks = tasks.filter(task => task.concluded)

    concludedTasks.length ? concludedTasks.forEach(task => log(formatTask(task))) : log('Nenhuma tarefa foi concluída')
}

// Exibe apenas as tarefas não concluídas
async function viewNotConcludedTasks(){
    const tasks = await loadTasks()

    if(!tasks.length) { log('Não há nenhuma tarefa cadastrada'); return }

    const inconcludedTasks = tasks.filter(tasks => !tasks.concluded)

    inconcludedTasks.length ? inconcludedTasks.forEach(task => log(formatTask(task))) : log('Todas as tarefas foram concluídas')
}

// Valida se um ID existe na lista de tarefas
function idExists(id, tasks){
    const tasksId = tasks.map(task => task.id)
    const foundId = tasksId.find(value => value === id)

    return foundId
}

// Permite marcar uma ou várias tarefas(mas sendo uma de cada vez) como concluídas
async function concludeTask(){
    let control
    do{
        const tasks = await loadTasks()

        if (!tasks.length) { log('Não há nenhuma tarefa registrada'); return }

        const id = +prompt('Digite o ID da tarefa que deseja marcar como CONCLUÍDA: ')
        
        if (!idExists(id, tasks)) { log('O ID informado não existe'); return }

        const task = tasks[id - 1]

        task.concluded ? log('A tarefa já está [✓]CONCLUÍDA') : (task.concluded = true, log('Tarefa marcada como [✓]CONCLUÍDA'))

        await saveTasks(tasks)

        control = prompt('Ainda deseja concluir alguma tarefa (S/N)? ')
    } while (control === 's' || control === 'sim')
}

// Exporta as funções de escolha e exibição de menu para o módulo principal
export async function chooseOption(option){
    switch(option){
        case '1':
            await createTask()
            return true
        case '2':
            await viewAllTasks()
            return true
        case '3':
            await viewConcludedTasks()
            return true
        case '4':
            await viewNotConcludedTasks()
            return true
        case '5':
            await concludeTask()
            return true
        case '6':
            log('Encerrando...')
            return false
    }
}

export function showMenu(){
    return `
 -------------------MENU---------------------
|1 - Criar uma nova tarefa                   |
|2 - Visualizar todas as tarefas             |
|3 - Visualizar apenas tarefas concluídas    |
|4 - Visualizar apenas tarefas NÃO concluídas|
|5 - Concluir uma tarefa                     |
|6 - Sair                                    |
 --------------------------------------------`
}