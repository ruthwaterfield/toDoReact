import React, {Component} from 'react';

class NewTask extends Component {
    render() {
        return (
            <div className="container">
            <form className="form-horizontal" method="post">
                <div className="form-group row">
                    <label htmlFor="task" className="control-label col-xs-1 col-xs-offset-3">Task</label>
                    <div className="col-xs-5">
                        <input type="text" className="form-control" id="task" required/>
                    </div>
                </div>
                <div className="checkbox row NewTask-CheckboxArea">
                    <label htmlFor="done" className="control-label col-xs-offset-3 col-xs-1">Done</label>
                    <div className="col-xs-1 NewTask-Checkbox">
                        <input type="checkbox" id="done"/>
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn NewTask-Submit col-xs-6 col-xs-offset-3">Add item</button>
                </div>
            </form>
            </div>
        )
    }
}


export default NewTask;
