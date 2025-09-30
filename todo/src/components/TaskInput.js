import React from 'react';

class TaskInput extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = {
            input: ''
        };
     }
    
addTask = () => { // функция добавления задачи
    const {input} = this.state; // деструктурируем состояние, вытаскивая из него input
    if(input) {
        this.props.addTask(input);
        this.setState({input: ''}); // очищаем инпут после добавления задачи
    }
}

handleKeyPress = (e) => {
    if(e.key === 'Enter') {
        this.addTask();
    }
}

inputChange = event => {
    this.setState({input: event.target.value});
}

     render() { // рендерим компонент
        return(
            <div className="task-input">
                <input 
                    onChange={this.inputChange} 
                    onKeyPress={this.handleKeyPress}
                    value = {this.state.input}
                    placeholder="Enter new task..."
                /> 
                <button onClick={this.addTask}>ADD</button>
            </div>
        );
     }
}


export default TaskInput;