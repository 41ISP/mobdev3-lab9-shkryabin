import React from 'react'; // set state - функция обновления состояния
import Task from './components/Task';
import TaskInput from './components/TaskInput'; 

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      tasks: [
        {id: 0, title:'Create todo-react app', done: false},
        {id: 1, title:'Make a video about it ', done: false},
        {id: 2, title:'Create simple todo', done: false}
      ]
  } ;
}

updateTask = (id,newTitle) => 
this.setState(state => {
  let {tasks} = state; // также деструктурируем состояние 
  const index = tasks.findIndex(task => task.id === id) // присваевымаем id значению tasks 
  if(tasks != -1 ){
    tasks[index] = {...tasks[index], title:newTitle}
  }
  return {task: [...tasks]}
})





addTask = task => {
  this.setState(state => {
    let {tasks} = state; // деструктурируем состояние, вытаскивая из него массив tasks
    const newId = tasks.length === 0 ? 0 : tasks[tasks.length - 1].id + 1;
    tasks.push({
      id: newId, // id будет равен новому id
      title: task, // title будет равен значению, которое мы передаем в функци
      done: false // по умолчанию задача не выполнена
    })
    return {tasks: [...tasks]};
  })
}


doneTask = (id) => {
  const index = this.state.tasks.map(task => task.id).indexOf(id) // находим индекс задачи по id
  this.setState(state => {
    let {tasks} = state; // деструктурируем состояние, вытаскивая из него массив tasks
    tasks[index].done = true;
    return {tasks: [...tasks]};
  })
}


deleteTasks = (id) => { 
  this.setState(state => {
    let {tasks} = state;
    tasks = tasks.filter(task => task.id !== id); // удаляем задачу по id
    return {tasks};

})

}
render() {
  const{tasks} = this.state;
  const activeTasks = tasks.filter((task => !task.done));
  const doneTasks = tasks.filter((task => task.done)) // создаем константу с активными задачами, фильтруя массив tasks и оставляя только те задачи, которые не выполнены



  return(
    <div className='App'>
      <h1 className='top'>Active tasks: {activeTasks.length}</h1>
      {[...activeTasks,...doneTasks].map((task) =>( // сортировка задач с помощью деструктуризации массива [...activeTasks,...doneTasks]
      <Task 
      key={task.id}
      doneTask = {() => this.doneTask(task.id)} 
      deleteTasks = {() => this.deleteTasks(task.id)}
      updateTask = {() => this.updateTask(task.id)} // передача функций для обновления
      task = {task}
      ></Task> // с помощью метода map перебираем массив и для каждого элемента создаем компонент Task
    ))}
      <TaskInput addTask={this.addTask}> </TaskInput>
    </div> // и также с помощью jsx ренедерим все tasks  
  )
}
}



export default App;