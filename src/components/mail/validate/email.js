export const checkMail = function (mail) {
  var emailReg = /^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  if (emailReg.test(mail) || mail.length === 0) {
    return true
  }
  return false
}
