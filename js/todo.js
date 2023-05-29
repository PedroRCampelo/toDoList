// Submit task formm
todoForm.onsubmit = function(event){
  event.preventDefault()
  if(todoForm.name.value != ''){
    const data = {
      name: todoForm.name.value
    }
    dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(()=>{
      console.log(`Task sent ${data.name}`);  
    }).catch((err)=>{
      showError(`you have exceeded the text limit(30): `, err)
    })
    todoForm.name.value = ''
  }else{
    alert('Form empty');
  }
}

// Show list of taks - USER

function fillTodoList(dataSnapshot){
  ulTodoList.innerHTML = ''
  const num = dataSnapshot.numChildren()
  todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':' // show num of tasks
  // ========

  dataSnapshot.forEach((item)=>{
    const value = item.val()
    const li = document.createElement('li') // create a li element
    const spanLi = document.createElement('span') // create a span element
    spanLi.appendChild(document.createTextNode(value.name))
    li.appendChild(spanLi) // add span in li

    const liRemoveBtn = document.createElement('button') // create a delete button
    liRemoveBtn.appendChild(document.createTextNode('Del')) // Text button
    liRemoveBtn.setAttribute('onclick', 'removeTodo(\"' + item.key + '\")') // onclick button attribute
    liRemoveBtn.setAttribute('class', 'danger todoBtn') // button style classes 
    li.appendChild(liRemoveBtn) // add button Remove on Li

    const liUpdateBtn = document.createElement('button') // create a delete button
    liUpdateBtn.appendChild(document.createTextNode('Att')) // Text button
    liUpdateBtn.setAttribute('onclick', 'updateTodo(\"' + item.key + '\")') // onclick button attribute
    liUpdateBtn.setAttribute('class', 'alternative todoBtn') // button style classes 
    li.appendChild(liUpdateBtn) // add button Remove on Li

    ulTodoList.appendChild(li) // add li in task list
  })
 }

 // Remove tasks function
 function removeTodo(key){
  const confirmation = confirm(`Do you want to delete the task`)
  if(confirmation){
    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().catch((err)=>{
      showError('error: ', err)
    })
  }
 }

 // Update tasks function
 function updateTodo(key){
  const newTodoName = prompt('Set the new name')
  if(newTodoName != ''){
    const data = {
      name: newTodoName
    }
    
    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data).then(()=>{
      console.log();
    })
  }else{
    alert('Empty')
  }
 }