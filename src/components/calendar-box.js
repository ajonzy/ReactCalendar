import React, { Component } from "react"

export default class CalendarBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            remiderExists: false,
            reminderId: undefined
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    componentDidMount() {
        fetch(`https://aoj-calendar-app-february1st.herokuapp.com/reminder/get/${this.props.monthId}/${this.props.date}`)
        .then(response => response.json())
        .then(data => {
            if (data.text) {
                this.setState({ 
                    text: data.text,
                    remiderExists: true,
                    reminderId: data.id
                })
            }
        })
        .catch(error => console.log(error))
    }

    handleChange(event) {
        this.setState({ text: event.target.value })
    }

    handleSumbit() {
        if (this.state.remiderExists === false && this.state.text != "") {
            fetch("https://aoj-calendar-app-february1st.herokuapp.com/reminder/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    text: this.state.text,
                    date: this.props.date,
                    month_id: this.props.monthId
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
        else if (this.state.remiderExists === true && this.state.text != "") {
            fetch(`https://aoj-calendar-app-february1st.herokuapp.com/reminder/update/${this.state.reminderId}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ text: this.state.text })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
        else if (this.state.remiderExists === true && this.state.text === "") {
            fetch(`https://aoj-calendar-app-february1st.herokuapp.com/reminder/delete/${this.state.reminderId}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div className="calendar-box">
                <div className="date">{this.props.date}</div>

                <textarea 
                    value={this.state.text} 
                    onChange={this.handleChange} 
                    onBlur={this.handleSumbit}
                ></textarea>
            </div>
        )
    }
}