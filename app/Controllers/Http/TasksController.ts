import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from '../../Models/Task'

export default class TasksController {
  
	public async getTask(ctx: HttpContextContract) {
		const task = await Task.all()
			
    	if (task.length < 1) ctx.response.status(404).send({ data: null, message: 'No existen notas todavia' })

    	return ctx.response.status(200).send({ data: task, message: 'Lista de tasks' })
  	}

  	public async getTaskById(ctx: HttpContextContract) {
    const { id } = ctx.request.params()

	const task = await Task.find(id)

	if (task === null) return ctx.response.status(404).send({ data: null, message: `la task ${id} no existe` })
		
    return ctx.response.status(200).send({ data: task, message: `Task de id ${task[0].id}` })
  	}

  	public async newTask(ctx: HttpContextContract) {
		const { title, information, task_date, complexity} = ctx.request.body()
		let task:any = new Task()
		if (title === undefined && information === undefined && task_date === undefined && complexity === undefined) {
			return ctx.response.status(404).send({ data: null, message: `There is no information to create a task` })
		}

		const res = await task.fill({
			title: title, 
			information: information, 
			task_date: task_date, 
			complexity: complexity,
			done: false,
			archived: false
		}).save()
		console.log(res.id);

		return ctx.response.status(201).send({ data: res.id, message: `nueva task creada` })
  	}

	public async archiveTaskById(ctx: HttpContextContract) {
			const { id } = ctx.request.params()

			const task = await Task.findOrFail(id)

			if (task === null) return ctx.response.status(404).send({ data: null, message: `la task ${id} no existe` })
			
			task.archived = !task.archived
			await task.save()

			return ctx.response.status(200).send({ data: 0, message: `la task ${task.id} fue correctamente ${task.archived? 'archivada': 'restaurada'}` })
	}

	public async doneTaskById(ctx: HttpContextContract) {
		const { id } = ctx.request.params()

		const task = await Task.findOrFail(id)

		if (task === null) return ctx.response.status(404).send({ data: null, message: `la task ${id} no existe` })
		
		task.done = !task.done
		await task.save()

		return ctx.response.status(200).send({ data: 0, message: `la task ${task.id} fue correctamente ${task.archived? 'realizada': 'restaurada'}` })
	}

	public async updateTaskById(ctx: HttpContextContract) {
			const { title, information, task_date, complexity, done, archived } = ctx.request.body()
			const { id } = ctx.request.params()
		
			if (title === undefined && information === undefined && task_date === undefined && complexity === undefined) {
				return ctx.response.status(404).send({ data: null, message: `There is no information to update` })
			}

			const task = await Task.findOrFail(id)
			if (task === null) return ctx.response.status(404).send({ data: null, message: `la task ${id} no existe` })
			
			task.title = title 
			task.information = information
			task.task_date = task_date
			task.complexity = complexity
			task.done = done
			task.archived = archived
			task.save()
			
			return ctx.response.status(200).send({ data: task, message: `Actualizando Task ${task.id}` })
	}
}