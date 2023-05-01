import * as React from 'react';
import Button from '@mui/material/Button';
import './index.css';
import axios from 'axios';

export default function MyApp() {
  return (
    
      <LoginPage></LoginPage>
   
  );
}

function NewBut(props){

  return (
    <Button onClick={props.onclick} id='button' variant="contained">Verify</Button>
  )
  
}


class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      valid: true
    }
  }

  
  status(){
    if(this.state.error != null){
      return (
        <p class='err'>{this.state.error}</p>
      )
    }
  }

  //this error methods sets the state to inclue error
  error(i){
    this.setState({
      valid: false,
      error: i
   })
  }

  buttonClickTest() {

    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value;
    
    

    if(emailValue.indexOf('@') < 0 || emailValue.indexOf(' ') >= 0){
      
      this.error('Invalid email. Must have \'@\' and cannot have any spaces.')
    }
    else{

      axios.get('http://localhost:5000/', {
        params: {
          email: emailValue
        }
      })
      .then((response)=>{
        if(response.data === false){
          this.error('This email has already been used.'); 
        }else{
          this.setState({
            valid: true,
            error: null
          })
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });  
    }

      

    

  }

  

  render(){

    return (
      <div id="box">
        <input class={this.state.valid ? 'true' : 'false'} id='email' type= "email"></input>
      
        <NewBut 
          onclick={()=>this.buttonClickTest()}>  
        </NewBut>
        {this.status()}
      
      </div>
    )
  }

}


