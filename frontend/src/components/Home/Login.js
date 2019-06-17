import React, {Component} from 'react';
import io from 'socket.io-client'

import "./Login.css"

var endpoint = 'http://localhost:3001'

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: "",
			password: ""
		}
		this.socket = io.connect(endpoint);
		// console.log(this.socket);
		this.socket.on('loginStatus', ({status, msg}) => {
			console.log("in Login.js")
			console.log(status);
			if(status === 'Fail'){
				console.log(msg);
			}else if(status === 'Success'){
				this.props.handleLogin(msg);
			}
		})
	}
	changeValue = (e) => {
		let ret = {}
		ret[e.target.id] = e.target.value;
		this.setState(ret);
	}
	login = (e) => {
		e.preventDefault();
		if(!this.state.name || !this.state.password) return;
		this.socket.emit('login', {'name': this.state.name, 'password': this.state.password});
	}
	render(){
		return(
			<div className="container" style={{padding: '0 50px 0 100px'}}>
				<form onSubmit={this.login}>
                    <div className="form-group">
                        <label>User Name: </label>
						<input  id='name'
								type="text"
								placeholder="Name......."
                                className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
						<input  id='password'
								type="text"
                                placeholder="*********"
								className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn" style={{backgroundColor: '#3f51b5', color: 'white'}}/>
                    </div>
                </form>
			</div>
		)
	}
}

export default Login;