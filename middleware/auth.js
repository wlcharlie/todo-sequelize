module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', '請先登入')
    res.redirect('/users/login')
  }
}