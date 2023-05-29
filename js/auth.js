/* 
First submit button:

If 'enter' = sign in
Else = create account
*/

authForm.onsubmit = function(event){
  showItem(loading)
  event.preventDefault()
  if(authForm.submitAuthForm.innerHTML == 'Enter'){
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch((err)=>{
      showError('Access failed', err)
    })

  }else{
    firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch((err)=>{
      showError('Registration failure', err)
    })
  }
}

// centralizes and handles authentication
firebase.auth().onAuthStateChanged((user)=>{
  hideItem(loading)
  if(user){
    showUserContent(user)
  }else{
    showAuth()
  }
})

// LogOut
function signOut(){
firebase.auth().signOut().catch((err)=>{
  showError('Error', err)
})
}


// Verify email function
function sendEmailVerification(){
  showItem(loading)
  const user = firebase.auth().currentUser
  // Method Firebase
  user.sendEmailVerification(actionCodeSettings).then(()=>{
    hideItem(loading)
    alert(`verification email sent to ${user.email}!`)
  }).catch((err)=>{
    showError('Error to send verification', err)
  })
}

// Reset password 
function sendPasswordResetEmail(){
  const email = prompt('Inform your email address.', authForm.email.value)
  if(email){
    showItem(loading)
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(()=>{
      alert(`reset email sent to ${email}, check your inbox.`)
      hideItem(loading)
    }).catch((err)=>{
      showError('your email is probably wrong :(', err)
    })
  }else{
    alert('Wrong email')
  }
}

// Auth with google
function signInWithGoogle(){
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch((err)=>{
    showError('Error connection to Google :(', err)
  })
}

// Auth with GitHub
function signInWithGithub(){
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).catch((err)=>{
    showError('Error connection to GitHub :(', err)
  })
}


// Change username
  function updateUserName(){
    const newUserName = prompt('Write your new username.', userName.innerHTML)
    if(newUserName && newUserName != ''){
      userName.innerHTML = newUserName
      showItem(loading)
      firebase.auth().currentUser.updateProfile({
        displayName: newUserName
      }).catch((err)=>{
        showError('Error', err)
      })
    }else{
      alert('Username cannot be empty')
    }
    hideItem(loading)
    
  }

  // Delete user account 
    function deleteUserAccount(){
      const confirmation = confirm('Do you really want to delete the account?')
      if(confirmation){
        showItem(loading)
        firebase.auth().currentUser.delete().then(()=>{
          alert('See uou soon :(')
        }).catch((err)=>{
          showError('Error', err)
        }).finally(()=>{
          hideItem(loading)
        })
      }
    }