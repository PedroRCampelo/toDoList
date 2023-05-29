// References 
const authForm = document.getElementById('authForm')
const authFormTitle = document.getElementById('authFormTitle')
const register = document.getElementById('register')
const access = document.getElementById('access')
const loading = document.getElementById('loading')
const auth = document.getElementById('auth')
const userContent = document.getElementById('userContent')
const userEmail = document.getElementById('userEmail')
const sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv')
const emailVerified = document.getElementById('emailVerified')
const passwordReset = document.getElementById('passwordReset')
const userName = document.getElementById('userName')
const userImg = document.getElementById('userImg')
// toDo 
const todoForm = document.getElementById('todoForm')
const todoCount = document.getElementById('todoCount')
const ulTodoList = document.getElementById('ulTodoList')

//====================================================================

// change to form 'register'
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Create'
  authFormTitle.innerHTML = 'Create a new account'
  hideItem(register)
  showItem(access)
  hideItem(passwordReset)
}

// already have access
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Enter'
  authFormTitle.innerHTML = 'Login '
  hideItem(access)
  showItem(register)
  showItem(passwordReset)
}

// help function
function showItem(element) {
  element.style.display = 'block'
}

function hideItem(element) {
  element.style.display = 'none'
}

// Show content to users auth
function showUserContent(user){
  console.log(user);
  if(user.providerData[0].providerId == 'github.com'){
    emailVerified.innerHTML = 'Trusted authentication with GitHub :)'
    hideItem(sendEmailVerificationDiv)
  }
  else if(user.emailVerified){
    emailVerified.innerHTML = 'verified email :)'
    hideItem(sendEmailVerificationDiv)
  }else{
    emailVerified.innerHTML = 'unverified email :/'
    showItem(sendEmailVerificationDiv)
  }

  userImg.src = user.photoURL ? user.photoURL : 'assets/unknownUser.png'
  userName.innerHTML = user.displayName
  userEmail.innerHTML = user.email
  
  hideItem(auth)

  dbRefUsers.child(firebase.auth().currentUser.uid).on('value', (dataSnapshot)=>{
    fillTodoList(dataSnapshot)
  })

  showItem(userContent)
}

// Show content to users NO auth
function showAuth(){
  authForm.email.value = ''
  authForm.password.value = ''
  hideItem(userContent)
  showItem(auth)
}

// error center
function showError(prefix, err){
  console.log(err.code);
  hideItem(loading)
  switch (err.code) {
    case 'auth/user-not-found': alert(prefix + ': ' + 'Email not registered')
      break;
  
    default: alert(prefix + ': ' + err.message)
  }
}

// config verify email
const actionCodeSettings = {
  url: 'http://127.0.0.1:5500/'
}

// References DB
const database = firebase.database()
const dbRefUsers = database.ref('users')