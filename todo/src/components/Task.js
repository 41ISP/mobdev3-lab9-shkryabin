// состояние передается через props 
import React from 'react';

// отказался от const так как это сильно мешало редактированию так как значения были не изменными 

class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false, 
            editText: this.props.task.title
        }
}

validateText = (text) => {
    if(!text.trim()) {
        return "Вы не можете оставить пустое поле"
    }
    if (text.trim().length > 100) {
        return "Задача слишком длинная"
    }

}


startEditing = () => {  // включаем режим редактирования переводя значение isEditing в значение true 
    this.setState ({
        isEditing: true,
        editText: this.props.task.title
    })

}



saveEditing = () => {
    if(this.state.editText.trim()) {
        this.props.updateTask(this.state.editText.trim())
        this.setState ({isEditing: false})
    }
}




cancelEditing = () => {   // также выключаем режим редактирования 
    this.setState ({
        isEditing: false, 
        editText: this.props.task.title 
    })
}


handleEditChange = (event) => {   // обновляем текст в поле ввода 

    this.setState({editText: event.target.value});

}


handleKeyPress = (e) => {
    if(e.key ==="Enter") {
        this.saveEditing();
    } else if  (e.key === "Escape") {
        this.cancelEditing();
    }
}


render() {

    const {task, doneTask, deleteTasks} = this.props
    const {isEditing, editText} = this.state

    const className = "task" + (task.done ? " task-done" : ""); // если задача выполнена, то добавляем класс done


    // если задача в режиме редактирования то мы отрисовываем поле 
    if (isEditing) {
        return (
            <div className={className + 'editing'}>
                <div className='task content'>
                    <input type = "text"
                    value={editText}
                    onChange={this.handleEditChange}
                    onKeyPress={this.handleKeyPress}
                    className='edit-input'
                    // автоматически ставим фокус на поле ввода с помощью функции autoFocus
                    autoFocus> 
                    </input>
                    <div className='action-btn'>
                        <span onClick={this.saveEditing} title='Save'>
                        </span>
                        <span onClick={this.cancelEditing} title = "Cancel">
                        </span>
                    </div>
                </div>
            </div>
        )
    }

     // обычный режим отрисовки без редактирования 
    return (         
       <div className={className}>
        <div className="task-content">
            <span className="task-title">{task.title}</span>
            <div className='action-btn'>
                {!task.done && <span onClick={this.startEditing} title='Редактирование'></span>}
                {task.done 
                ? <span onClick={deleteTasks} title=''></span>
                : <span onClick={doneTask}title='Удаление'></span>}
            </div>
        </div>
       </div> 
    )

}

}

export default Task;
