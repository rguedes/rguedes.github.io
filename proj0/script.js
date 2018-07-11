const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}
const arr = []
let i = 0;

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function list_size(){
	return arr.length
}

function list_unchecked_size(){
	return arr.filter(function(arr){return !arr.checked}).length
}

function checkedTodo(){
	const id = this.getAttribute('data-index');
	const index = arr.findIndex(x => x.id == id);
	if(arr[index].checked)
		return true;

	arr[index].checked = true
	this.classList.add("checked");
	updateCounts();
}

function updateCounts() {
	itemCountSpan.innerHTML = list_size()
  	uncheckedCountSpan.innerHTML = list_unchecked_size()
}

function create(data){
	const li = document.createElement('li');
	li.classList.add('todo-container');
	//li.setAttribute('data-index', data.id);
	//li.addEventListener("click", checkedTodo);
	const span = document.createElement('span');
	span.classList.add('todo-span');
	span.setAttribute('data-index', data.id);
	span.addEventListener("click", checkedTodo);
	span.innerHTML = data.text;
	li.append(span);

	const button = document.createElement('button');
	button.setAttribute('data-index', data.id);
	button.addEventListener("click", deleteTodo);
	button.classList.add('todo-delete');
	button.innerHTML = "X";
	li.append(button);

	return li
}

function newTodo() {
  	let todo = prompt("Add new Todo", "");

	if (todo == null || todo == "") {
	    return false;
	} else{
		todo = {checked: false, text: todo, id: i++ }
		arr.push(todo)
	}
	list.append(create(todo));
	updateCounts();
}

function deleteTodo(){
	const id = this.getAttribute('data-index');
	const index = arr.findIndex(x => x.id == id);
	console.log(index);
	arr.splice(index, 1)
	var parent = this.parentNode;
	parent.remove();
	updateCounts();
}

