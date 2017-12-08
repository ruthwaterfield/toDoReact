import React, {Component} from 'react';

class UncompletedTasks extends Component {
    state = {tasks: []}

    componentDidMount() {
        fetch('/tasks')
            .then(res => res.json())
            .then(tasks => this.setState({tasks}))
    }

    render() {
        return (
            <div className="container">
                <h2>Uncompleted Tasks</h2>
                {this.state.tasks.map(task =>
                    <form key={task._id} className="form-horizontal" method="post">
                        <div className="container">
                            <div className="row col-xs-offset-2">
                                <div className="form-group col-xs-6">
                                    <input type="text" className="form-control" id="task" value={task.task} required/>
                                </div>
                                <div className="checkbox CheckboxArea col-xs-2 row">
                                    <label htmlFor="done" className="control-label col-xs-6">Done</label>
                                    <div className="Checkbox col-xs-6">
                                        <input type="checkbox" id="done" checked={task.done}/>
                                    </div>
                                </div>
                                <div className="form-group col-xs-1">
                                    <button type="submit" className="btn Submit">Update task</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        )
    }
}


export default UncompletedTasks;
