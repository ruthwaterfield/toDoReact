import React, {Component} from 'react';

class CompletedTasks extends Component {
    state = {tasks: []}

    componentDidMount() {
        fetch('/tasks?done=1')
            .then(res => res.json())
            .then(tasks => this.setState({tasks}))
    }

    render() {
        return (
            <div className="container">
                <h2>Completed Tasks</h2>
                {this.state.tasks.map(task =>
                    <form key={task._id} className="form-horizontal" method="post">
                        <div className="container">
                            <div className="row col-xs-offset-2">
                                <div className="form-group col-xs-6">
                                    <input type="text" className="form-control" id="task" checked={task.task} required/>
                                </div>
                                <div className="form-group col-xs-5">
                                    <button type="submit" className="btn Delete">Delete task</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        )
    }
}


export default CompletedTasks;
