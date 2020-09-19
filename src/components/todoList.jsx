import React from 'react';
import '../App.css';
import { Button, ButtonGroup } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class TodoList extends React.PureComponent {
    constructor(props) {
        super(props);

        const tasks = 
            // localStorage.getItem("tasks") ?
            // localStorage.getItem("tasks") :
            [{
                id: new Date().getTime(),
                text: 'Enter the new task and press the button "Add"',
                checked: false
            }];

        this.state = {
            tasks,
            newTaskText: "",
            activeTab: "All"
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
            return {...task, checked: event.target.checked}
        });
        this.setState({ tasks: newTasks });
    }

    createTasksList = (tasksArray) => tasksArray.map((task) => {
        return (
            <li key={task.id}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="checkbox-area">
                            <Input addon type="checkbox" className="checkbox" onChange={() => this.handleCheckTask(task.id)} checked={task.checked} aria-label="Checkbox for following text input" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupAddon className="task-text">
                        <div className="task-content">
                            <p>{task.text}</p>
                        </div>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <InputGroupText className="remove-task" onClick={()=>this.deletePost(task.id)}>&#10060;</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </li>
        );
    });

    
    addNewPost = (event) => {
        const { state: { newTaskText } } = this;
        if (newTaskText && (!event || event.key === "Enter")) {

        
        



            const newTasks = [...this.state.tasks,
            {
                id: new Date().getTime(),
                text: newTaskText,
                checked: false
            }];

            this.setState({ tasks: newTasks, newTaskText: "" });
        }
    }

    handleChangeInputText = (event) => {
        const { target: { value } } = event;
        this.setState({ newTaskText: value });
    }

    getCountTasks = (tasks) => {
        const numOfActiveTasks = tasks.filter((task)=>task.checked === false).length
        let countText = numOfActiveTasks 
        if (numOfActiveTasks) {
            countText += numOfActiveTasks === 1 ? " task left" : " tasks left";
        } else if (tasks.length) {
            countText = "All tasks completed! Congratulations!!!"
        } else {
            countText = "No tasks yet. Let's add a new one!"
        }
        return  countText;
    }

    changeActiveTab = (event) => {
        this.setState({ activeTab: event.target.name });
        console.log(this.state.activeTab);
    }

    getClassToTabButtons = (tabName) => {
        const { state: { activeTab } } = this;

        if (tabName === activeTab) {
            return "active-tab"
        } else {
            return "tab"
        }
    }

    goToLogin = () => {
        const { props: { history } } = this;

        history.push('/login');
    }

    render() {
        const { state: { tasks, newTaskText, activeTab }, props: { isAuthentificated } } = this;
        const filteredTasks = activeTab === "Active" ? tasks.filter((task)=>task.checked === false) :
            activeTab === "Completed" ? tasks.filter((task)=>task.checked === true) : tasks;
        
        let isAllChecked


        if (!isAuthentificated) { this.goToLogin() }

        if (tasks.length) {
            isAllChecked = tasks.filter((task) => !task.checked).length === 0 ? true : false;
        } else {
            isAllChecked = false;

        }



        return (
            <div className="todo-list">
                <h1>TODO List</h1>
                <InputGroup className="new-task-area">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="checkbox-area">
                            <Input addon type="checkbox" className="checkbox" onChange={this.handleCheckAll} checked={isAllChecked} aria-label="Checkbox for following text input" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input className="input-size" value={newTaskText} onKeyUp={(event) => this.addNewPost(event)} onChange={this.handleChangeInputText} name="body" placeholder="Enter the new task..." />
                    <InputGroupAddon addonType="append"><Button onClick={() => this.addNewPost()} color="secondary">Add</Button></InputGroupAddon>
                </InputGroup>
                <ul>
                    {this.createTasksList(filteredTasks)}
                </ul>
                <ButtonGroup>
                    <Button className={this.getClassToTabButtons("All")} onClick={this.changeActiveTab} name="All">All</Button>
                    <Button className={this.getClassToTabButtons("Active")} onClick={this.changeActiveTab} name="Active">Active</Button>
                    <Button className={this.getClassToTabButtons("Completed")} onClick={this.changeActiveTab} name="Completed">Completed</Button>
                </ButtonGroup>
                <p>{this.getCountTasks(tasks)}</p>
            </div>
        );
        
    }
}

export default withRouter(TodoList);