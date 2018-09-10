export const checkMail = function (address) {
  var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  if (mailReg.test(address) || address.trim().length === 0) {
    return true
  }
  return false
}
