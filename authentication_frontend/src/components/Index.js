import React, { Component } from 'react'

export default class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
        }
        this.user = {};
        this.token = localStorage.getItem("authToken");
    }

    logout() {
        // console.log(this.props)
        localStorage.removeItem("authToken");
        localStorage.removeItem("authStatus");
        this.props.history.replace("/login");
    }
    
    componentDidMount = () => {
        fetch("http://localhost:8000/me", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
              this.setState({ users: data })
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
    
    render() {
        return (
            <div style={{height: "100vh"}}>
                {
                    this.state.users.map((user, index) => {
                        return (
                            <div className="card" key={index} style={{width: "30rem"}}>
                                <div className="card-header">
                                    Welcome <span>{user.username}</span><br /><br />

                                    Below are the details which we got from you
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Your Email: {user.email}</li>
                                    <li className="list-group-item">Your Mobile Number: { user.mobileno }</li>
                                    <li className="list-group-item">You are from {user.country}</li>
                                    
                                    <li className="list-group-item">
                                        <button className="btn btn-primary" onClick={() => { this.logout() }}>Logout</button>
                                    </li>
                                </ul>
                            </div> 
                        )
                    })
                }
                
            </div>
        )
    }
}
