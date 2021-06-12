const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  return Todo.create({
    name,
    isDone: false,
    UserId: req.user.id
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findByPk(id)
    .then(todo => {
      todo.name = name
      todo.save()
      res.redirect(`/todos/${id}`)
    })
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.destroy({ where: { id } })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router