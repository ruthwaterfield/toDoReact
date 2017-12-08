import React, {Component} from 'react';

class NewTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: '',
            done: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/tasks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "task": this.state.task,
                "done": +this.state.done
            })
        }).then(function (res) {
            return res.json()
        }).then(function (parsedData) {
            if (parsedData.success) {
                this.setState({
                    "task": ''
                })
                // this.setState({
                //     "done": 0
                // })
            } else {
                alert('Sorry something went wrong!')
            }
        })
    }

    render() {
        return (
            <div className="container">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="task" className="control-label col-xs-1 col-xs-offset-3">Task</label>
                        <div className="col-xs-5">
                            <input type="text" className="form-control" id="task" name="task" required
                                   value={this.state.task} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="checkbox row CheckboxArea">
                        <label htmlFor="done" className="control-label col-xs-offset-3 col-xs-1">Done</label>
                        <div className="col-xs-1 Checkbox">
                            <input type="checkbox" id="done" name="done" checked={this.state.done}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="btn Submit col-xs-6 col-xs-offset-3">Add item</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default NewTask;
