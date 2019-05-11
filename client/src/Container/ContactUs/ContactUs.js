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
      showMsg:true
    }
  };
  sendEmailHandler = () => {};
  onChangeHandler = event => {
    let message = { ...this.state.message };
    console.log(message);
    message[event.target.name].value = event.target.value;
    this.setState({ message: message });
  };
  render() {
    return (
      <div className="wrapper-contact-us">
        <form>
          <h3 className="title-contact-us">Contact Us</h3>
          <Input
            classInput="input-subject-contact-us"
            placeholder="Subject"
            name="subject"
            value={this.state.message.value}
            change={e => this.onChangeHandler(e)}
          />
          <textarea
            placeholder="Your Message"
            name="textMessage"
            wrap="physical"
            ref={x => this.textarea = x} 
            className="text-msg-contact-us"
        
          />
          <button
            className="btn-send-meg-contact-us"
            onClick={this.sendEmailHandler}
          >
            Send Mail
          </button>
        </form>
    <p className="msg-contact-us">Thank you we will get back to you</p>
      </div>
    );
  }
}
export default ContactUs;
