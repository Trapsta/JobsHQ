import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

class Emailer extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
		this.handleCloseForm = this.handleCloseForm.bind(this);
	}

	handleSubmit (event) {
	    event.preventDefault();


	    const jobTitle = this.props.jobTitle;
	    const company = this.props.company;
	    //const senderID = this.props.senderID;
	    const jobDetails = this.props.jobDetails;
	    const jobLink = this.props.jobLink;
	    const senderEmail = this.refs.email.value;
	   

	    const senderID = senderEmail.substr(0, senderEmail.indexOf('@')); 
	    //console.log(senderID);
	    //console.log(process.env.REACT_APP_EMAILJS_USERID);
	    this.sendEmail("sendgrid", "jhq", jobTitle, company, senderID, jobDetails, jobLink, senderEmail);

	    this.setState({
	      formSubmitted: true
	    })

	    var form = "form" + this.props.id;
	    //console.log(form);
	    document.getElementById(form).setAttribute("class", "email-form");
	}

	  sendEmail (serviceID, templateID, jobTitle, company, senderID, jobDetails, jobLink, senderEmail) {

	  	const user_id = process.env.REACT_APP_EMAILJS_USERID;

	    window.emailjs.send(
	      serviceID,
	      templateID,
	      {
	        jobTitle,
	        company,
	        senderID,
	        jobDetails,
	        jobLink,
	        senderEmail
	      },
	      user_id)
	      .then(res => {
	        this.setState({ formEmailSent: true })
	      })
	      // Handle errors here however you like, or use a React error boundary
	      .catch(err => console.error('Failed to send Email. Error: ', err))
	  }

	  handleCloseForm(e) {
	  	var form = "form" + e.currentTarget.id;
	  	//console.log(form);
	  	document.getElementById(form).setAttribute("class", "email-form");
	  }


	render() {
		const formId = "form" + this.props.id;
		return(
			<form id={formId} ref={formId} onSubmit={this.handleSubmit} className="email-form">			    
			    <div className="form-group">
				    <input type="email" ref="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email address"  />
				    <button type="submit" className="btn btn-primary">Submit</button>
				    <button id={this.props.id} className="btn btn--cancel" onClick={this.handleCloseForm}>
			          Cancel
			        </button>
			    </div>
			</form>
			);
	}
}


export default Emailer;