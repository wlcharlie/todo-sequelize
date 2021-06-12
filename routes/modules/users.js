const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.locals.notifyMsg = req.flash('notifyMsg', '')
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (!(name && email && password && confirmPassword)) {
    req.flash('notifyMsg', '所有欄位皆為必填')
    return res.render('register', {
      name,
      email,
    })
  }

  if (password !== confirmPassword) {
    req.flash('notifyMsg', '密碼與確認密碼不同')
    return res.render('register', {
      name,
      email,
    })
  }

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      req.flash('notifyMsg', '此信箱已被註冊')
      return res.render('register', {
        name,
        email
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('goodMsg', '登出成功')
  res.redirect('/users/login')
})

module.exports = router