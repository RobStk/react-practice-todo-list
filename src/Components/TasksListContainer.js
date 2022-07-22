import React from "react";
import TasksRowsContainerStyle from "./Styles/TasksRowsContainerStyle";
import Task from "./Task";

class TasksListContainer extends React.Component {
    render() {
        const sortedTasks = [...this.props.tasksArr].sort((a, b) => a.done - b.done);
        const tasksComponentsList = sortedTasks.map((task) =>
            task = (
                <Task
                    title={task.title}
                    done={task.done}
                    key={task.id}
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