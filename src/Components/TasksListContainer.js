import React from "react";
import TasksRowsContainerStyle from "./Styles/TasksRowsContainerStyle";
import Task from "./Task";

class TasksListContainer extends React.Component {
    render() {
        let sortedTasks = [...this.props.tasksArr].sort((a, b) => a.creationDate - b.creationDate);
        const todoTasks = sortedTasks.filter((task) => !task.done);
        const doneTasks = sortedTasks.filter((task) => task.done);
        const preperedTasks = todoTasks.concat(doneTasks);
        const tasksComponentsList = preperedTasks.map((task) =>
            task = (
                <Task
                    title={task.title}
                    done={task.done}
                    key={task.id || task.tempId}
                    id={task.id}
                    onDelete={this.props.onDelete}
                    onTaskChange={this.props.onTaskChange}
                />
            )
        );

        return (
            <TasksRowsContainerStyle>
                {tasksComponentsList.length > 0 ? tasksComponentsList : <div>Brak zadań do wykonania.</div>}
            </TasksRowsContainerStyle>
        );
    }
}

export default TasksListContainer;