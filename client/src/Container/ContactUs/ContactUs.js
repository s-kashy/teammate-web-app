import React, { Component } from "react";
import "./ContactUs.css";
import Input from "../../Component/Input/Input";

class ContactUs extends Component {
  state = {
    message: {
      subject: {
        value: "",
        error: false
      },
      textMessage: {
        value: "",
        error: false
      },
      showMsg: false
    }
  };

  sendEmailHandler = (event) => {

    event.preventDefault()
    let copyMessage={...this.state.message}
    if (copyMessage.subject.value===""){
      copyMessage.subject.error=true
    }
    if (copyMessage.textMessage.value===""){
      copyMessage.textMessage.error=true
    }
    this.setState({message:copyMessage},()=>{
      let message={...this.state.message}
      if (message.subject.value!=="" && message.textMessage.value!==""){
      
        message.subject.value=""
        message.textMessage.value=""
        this.setState({message:message})
      }
    })

  };
  onChangeHandler = event => {
    let message = { ...this.state.message };
    message[event.target.name].value = event.target.value;
    message[event.target.name].error=false
    this.setState({ message: message },()=>{
    
    });
  };
  render() {
    const { message } = this.state;
    return (
      <div className="wrapper-contact-us">
        <form className="form-contact-us">
          <h3 className="title-contact-us">Contact Us</h3>
          <Input
            classInput="input-subject-contact-us"
            placeholder="Subject"
            name="subject"
            type="text"
            errorClass="error-class"
            error={message.subject.error}
            value={this.state.message.subject.value}
            change={e => this.onChangeHandler(e)}
          />
          <textarea
            placeholder="Your Message"
            name="textMessage"
            wrap="physical"
            onChange={(e) => this.onChangeHandler(e)}
            value={message.textMessage.value}
            ref={x => (this.textarea = x)}
            className="text-msg-contact-us"
          />
          {message.textMessage.error && (
            <p className="text-msg-error-contact-us">
              *You forgot to add a message
            </p>
          )}
          <button
            className="btn-send-meg-contact-us"
            onClick={this.sendEmailHandler}
          >
            Send Mail
          </button>
        </form>
       {this.state.showMsg && (<p className="msg-contact-us">Thank you we will get back to you</p>)}
      </div>
    );
  }
}
export default ContactUs;
