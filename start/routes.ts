/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/tasks', 'TasksController.getTask')

Route.post('/tasks', 'TasksController.newTask')

Route.get('/tasks/:id', 'TasksController.getTaskById')

Route.patch('/tasks/archive/:id', 'TasksController.archiveTaskById')

Route.patch('/tasks/done/:id', 'TasksController.doneTaskById')

Route.patch('/tasks/update/:id', 'TasksController.updateTaskById')
