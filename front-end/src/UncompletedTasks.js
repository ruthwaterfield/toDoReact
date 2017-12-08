import React, {Component} from 'react';

class UncompletedTasks extends Component {
    render() {
        return (
            <div className="container">
                <h2>Uncompleted Tasks</h2>
                <table className="table table-bordered table-hover">
                    <tr>
                    <th>Task</th>
                    <th>Done</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                </table>
            </div>
        )
    }
}


export default UncompletedTasks;
