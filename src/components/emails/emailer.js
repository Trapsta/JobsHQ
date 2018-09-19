import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
// import fs from 'fs';

//var jobDetails ="Sorry, Job description is not available. Please use the link below to learn more about this role."

class Emailer extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
		this.handleCloseForm = this.handleCloseForm.bind(this);
		this.getJD = this.getJD.bind(this);
	}

	handleSubmit (event) {
	    event.preventDefault();


	    const jobTitle = this.props.jobTitle;
	    const company = this.props.company;
	    const jobLink = this.props.jobLink;

	    //const jobDetails = this.getJD(jobLink);
	    
	    //console.log(jobDetails);
	    const senderEmail = this.refs.email.value;
	    const senderID = senderEmail.substr(0, senderEmail.indexOf('@')); 

	    setTimeout(500);
	    
	    this.sendEmail("sendgrid", "jhq", jobTitle, company, senderID,jobLink, senderEmail);
	    
	    

	    this.setState({
	      formSubmitted: true
	    })

	    var form = "form" + this.props.id;

	    document.getElementById(form).setAttribute("class", "email-form");
	}

	async getJD(url) {

		//Get job description
		let jd = [];
		let jobDesc = "";
		jobDesc = "iHub inMail job descriptions are not available yet. Please follow the link below to view the full JD."
		if (url.includes("ihub")) {
			// console.log(url + " is a Ihub Link");
			await axios.get(url)
		    .then((response) => {
		        if (response.status === 200) {
		            const html = response.data;
		            const $ = cheerio.load(html);
		            
		            $('.vacancy-description').each(function(i, elem) {
		                jd[i] = {
		                    description: $(this).find('p').text()
		                }
		            });
		            jobDesc = jd[0]["description"];
		        }
		    }, (error) => console.log(error));
		} else if (url.includes("fuzu")) {
			// console.log(url + " is a Fuzu Link");
			jobDesc = "Fuzu inMail job descriptions are not available yet. Please follow the link below to view the full JD."
			await axios.get(url)
		    .then((response) => {
		        if (response.status === 200) {
		            const html = response.data;
		            const $ = cheerio.load(html);
		            
		            $('.p-2').each(function(i, elem) {
		                jd[i] = {
		                    description: $(this).find('p').text() + $(this).find('li').text()
		                }
		            });
		            jobDesc = jd[0]["description"];
		        }
		    }, (error) => console.log(error));
		} else if (url.includes("linkedin")) {
			// console.log(url + " is a LinkedIn Link");
			jobDesc = "LinkedIn inMail job descriptions are not available yet. Please follow the link below to view the full JD."
			await axios.get(url)
		    .then((response) => {
		        if (response.status === 200) {
		            const html = response.data;
		            const $ = cheerio.load(html);
		            
		            $('#job-details').each(function(i, elem) {
		                jd[i] = {
		                    description: $(this).find('span').text()
		                }
		            });
		            jobDesc = jd[0]["description"];
		        }
		    }, (error) => console.log(error));
		} else  {
			// console.log(url + " is a unknown Link");
			jobDesc = "This recruiter's inMail job descriptions are not available yet. Please follow the link below to view the full JD."
		}

		

	    //jobDetails = jobDesc;
	    

	    return jobDesc;

	}

	async  sendEmail (serviceID, templateID, jobTitle, company, senderID, jobLink, senderEmail) {
	  	
	  	const jd = await Promise.all([this.getJD(jobLink)]);
	  	const jobDetails = jd[0];
	  	console.log(jobDetails);

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
				    <button type="submit" className="btn btn-primary"><span className="lnr lnr-envelope"></span></button>
				    <button id={this.props.id} className="btn btn--cancel" onClick={this.handleCloseForm}>
			          <span className="lnr lnr-cross-circle"></span>
			        </button>
			    </div>
			</form>
			);
	}
}


export default Emailer;