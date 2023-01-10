import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TasksController {
  
	public async getTask(ctx: HttpContextContract) {
    const notes = await Database
		.from('tasks')
		.select('*')
    
    return ctx.response.status(200).send({ data: notes, message: 'Lista de tasks' })
  }

  public async getTaskById(ctx: HttpContextContract) {
    const { id } = ctx.request.params()

    const task = await Database
    .from('tasks')
    .select('*')
    .where('id', id)

		console.log(task);
		
		if (task.length < 1) return ctx.response.status(404).send({ data: null, message: `la task ${id} no existe` })
		
    return ctx.response.status(200).send({ data: task, message: `Task de id ${task[0].id}` })
  }

  public async newTask(ctx: HttpContextContract) {
		const { title, information, task_date, complexity} = ctx.request.body()

		const savedTask = await Database
  	.table('tasks')
  	.returning('id')
  	.insert({
    	title: title,
    	information: information,
    	task_date: task_date,
			complexity: complexity,
			done: false,
			archived: false,
  	})

		return ctx.response.status(201).send({ data: savedTask, message: `nueva task ${savedTask[0].id} creada` })
  }

  public async archiveTaskById(ctx: HttpContextContract) {
		const { id } = ctx.request.params()

		const isArchived = await Database
		.from('tasks')
		.select('archived')
		.where('id', id)

		if (isArchived.length < 1) return ctx.response.status(404).send({ data: null, message: `la task ${id} no existe` })

		const updatedTask = await Database
		.from('tasks')
		.returning('id')
		.where('id', id)
		.update({ archived: !isArchived[0].archived })
		
		return ctx.response.status(200).send({ data: updatedTask, message: `Archivando Task ${updatedTask[0].id}` })
  }

  public async updateTaskById(ctx: HttpContextContract) {
		const { title, information, task_date, complexity } = ctx.request.body()
		const { id } = ctx.request.params()

		if (title === undefined && information === undefined && task_date === undefined && complexity === undefined) {
			return ctx.response.status(404).send({ data: null, message: `There is no information to update` })
		}
		
		console.log(id, title, information, task_date, complexity);
		
		const updatedTask = await Database
		.from('tasks')
		.returning('id')
		.where('id', id)
		.update({
			title: title, 
			information: information, 
			task_date: task_date, 
			complexity: complexity
		})

		return ctx.response.status(200).send({ data: updatedTask, message: `Actualizando Task ${updatedTask[0].id}` })
  }
}
