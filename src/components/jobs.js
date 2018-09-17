 import React from 'react';
import * as iHub from './ihubList.json';
import * as LinkedIn from './linkedin.json';
import * as Fuzu from './fuzuList.json';
import Emailer from './emails/emailer';


const allJobs = [].concat(iHub, Fuzu, LinkedIn);

class Jobs extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      jobs: allJobs,
      activeRoute: this.props.category
    };

    this.filterJobs = this.filterJobs.bind(this);
    this.filterDev = this.filterDev.bind(this);
    this.filterDesign = this.filterDesign.bind(this);
    this.filterBusiness = this.filterBusiness.bind(this);
    this.filterInterns = this.filterInterns.bind(this);
    this.showOthers = this.showOthers.bind(this);
    this.HandleLikeJob = this.HandleLikeJob.bind(this);
    this.handleEmailJob = this.handleEmailJob.bind(this);
  }


  componentWillReceiveProps(newProps) {
    if (newProps.category === "All") {
      this.setState({
        jobs: allJobs
      });
    } else if (newProps.category === "Dev") {
      this.filterDev();
    } else if (newProps.category === "Design") {
      this.filterDesign();
    } else if (newProps.category === "Marketing") {
      this.filterBusiness();
    } else if (newProps.category === "Interns") {
      this.filterInterns();
    } else if (newProps.category === "Others") {
      this.showOthers();
    }
    this.setState({data: newProps});
  }



  filterJobs(array, string) {
    
    return array.filter( element => element.jobTitle.toLowerCase().includes(string.toLowerCase()));
  }

  filterDev() {
    var newJobs = this.filterJobs(allJobs, 'dev').concat(this.filterJobs(allJobs, 'engi'));

    this.setState({
      jobs: newJobs
    });
  }



  filterDesign() {
    var newJobs = this.filterJobs(allJobs, 'des');

    this.setState({
      jobs: newJobs
    });
  }



  filterBusiness() {
    var newJobs = this.filterJobs(allJobs, 'man');

    this.setState({
      jobs: newJobs
    });
  }



  filterInterns() {
    var newJobs = this.filterJobs(allJobs, 'intern');

    this.setState({
      jobs: newJobs
    });
  }


  showOthers() {

    var newJobs = allJobs.filter( element => !element.jobTitle.toLowerCase().includes('dev'.toLowerCase()));
    newJobs = newJobs.filter( element => !element.jobTitle.toLowerCase().includes('des'.toLowerCase()));
    newJobs = newJobs.filter( element => !element.jobTitle.toLowerCase().includes('intern'.toLowerCase()));
    newJobs = newJobs.filter( element => !element.jobTitle.toLowerCase().includes('man'.toLowerCase()));


    this.setState({
      jobs: newJobs
    });
  }

  
HandleLikeJob = (e, prevState) => {
  
    var i = e.currentTarget.dataset.id;
    var jobs = this.state.jobs;
    var job = jobs[i];

    job["jobLikes"] = job["jobLikes"] + 1;

    this.setState({
      jobs: jobs
    });

}


handleEmailJob(e) {

  var itemId = e.currentTarget.id;
  const form = "form" + itemId;


  document.getElementById(form).setAttribute("class", "activeForm");

}





  render() {

    const joblist = this.state.jobs.map((job, keyIndex) =>
      
        <li id={keyIndex} key={keyIndex} className="job-card-list-item">
          <div className="job-card">          
            <div className="job-title">
                <h3 className="job-title"><a className="job-link" href={job["url"]} target="_blank">{job["jobTitle"]}</a> <span>  at {job["company2"] === undefined ? job["company"] : job["company2"] } </span></h3>
            </div>
            <div className="job-meta">
              <span className="job-action"> <span data-id={keyIndex} className="lnr lnr-thumbs-up" onClick={this.HandleLikeJob} ></span> <span className="likes-count">{job["jobLikes"] === 0 ? " No Likes" : job["jobLikes"] === 1 ?  job["jobLikes"] + " Like" : job["jobLikes"] + " Likes"} </span> | <span id={keyIndex} onClick={this.handleEmailJob}><span className="lnr lnr-envelope"></span> Email Job </span></span> |
              <span className="job-source">By {job["source"]} </span> |
              <span className="job-stamp"> Added {job["date"]} </span> | <a className="apply-link" href={job["url"]} target="_blank">Apply Job</a>
              <Emailer id={keyIndex} className="hidden" jobTitle={job["jobTitle"]} company={job["company2"] === undefined ? job["company"] : job["company2"] }  senderID="Jasper" jobDetails="N/A" jobLink={job["url"]} />
            </div>
          </div>          
        </li>
      );

    return(

        
        <section id="jobs-board" className="jobs-board">
            <div className="row">
              <ol className="all-jobs-list">
                {joblist}
              </ol> 
            </div>
        </section>        
      );
  }
}


export default Jobs;