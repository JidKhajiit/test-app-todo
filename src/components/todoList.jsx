import React from 'react';
import '../App.css';

class TodoList extends React.PureComponent {
    constructor(props) {
        super(props);

        const tasks = 
            // localStorage.getItem("tasks") ?
            // localStorage.getItem("tasks") :
            [{
                id: new Date().getTime(),
                title: "Add new task",
                text: 'Press the button "Add" to add the new task',
                checked: false
            }];

        this.state = {
            tasks,
            newTitle: "",
            newBody: "",
        };
    }

    handleCheckTask = (id) => {
        const newTasks = this.state.tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    checked: !task.checked
                }
            }

            return task
        });
        this.setState({ tasks: newTasks });
    };

    deletePost = (id) => {
        const newTasks = this.state.tasks.filter((task)=> task.id !== id)
        this.setState({ tasks: newTasks });
    }

    handleCheckAll = (event) => {
        const newTasks = this.state.tasks.map(task => {


            // if (task.id === id) {
            //     return {
            //         ...task,
            //         checked: !task.checked
            //     }
            // }

            return {...task, checked: event.target.checked}
        });
        this.setState({ tasks: newTasks });
    }

    createTasksList = (tasksArray) => tasksArray.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" className="checkbox" onChange={() => this.handleCheckTask(task.id)} checked={task.checked} />
                <div className="task-content">
                    <p>title: {task.title}</p>
                    <p>text: {task.text}</p>
                </div>
                <div className="align-center">
                    <div onClick={()=>this.deletePost(task.id)} className="delete">X</div>
                </div>
                
            </li>
        );
    });

    addNewPost = (event) => {
        event.preventDefault();
        const { state: { newTitle, newBody } } = this;

        if(newTitle && newBody) {

            const newTasks = [...this.state.tasks,
            {
                id: new Date().getTime(),
                title: newTitle,
                text: newBody,
                checked: false
            }];

            this.setState({ tasks: newTasks, newTitle: "", newBody: "" });
            console.log(this.state.tasks);
        }
    }

    handleChangeForm = (event) => {
        console.log(event.target);
        const { target: { name, value } } = event;

        switch (name) {
            case 'title': this.setState({ newTitle: value }); break;
            case 'body': this.setState({ newBody: value }); break;
            default:
        }
    }

    count = (tasks) => {
        let num = tasks.filter((task)=>task.checked === false).length
        num += num === 1 ? " item left" : " items left";
        return  num;
    }

    render() {
        const { state: { tasks, newTitle, newBody } } = this;
        const checkAll = tasks.filter((task) => !task.checked).length === 0 ? true : false;
        console.log(checkAll);
        return (
            <div className="todo-list">
                Add new task
                <input type="checkbox" onChange={this.handleCheckAll} checked={checkAll}/>
                <form
                    id="add-post"
                    onSubmit={this.addNewPost}>
                    <input type="text" value={newTitle} onChange={this.handleChangeForm} name="title" placeholder="title.." />
                    <input type="textarea" value={newBody} onChange={this.handleChangeForm} name="body" placeholder="body.." />
                    <input type="submit" value="Add" />
                </form>
                <ul>
                    {this.createTasksList(tasks)}
                </ul>
                <p>{this.count(tasks)}</p>
            </div>
        );
    }
}

export default TodoList;