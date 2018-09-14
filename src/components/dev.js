import React from 'react';
//import iHub from './ihub'
import * as iHub from './ihubList.json';
import * as LinkedIn from './linkedin.json';
import * as Fuzu from './fuzuList.json';



// const StyledCounter = styled.div`
//   /* ... */
// `
const allJobs = [].concat(iHub, Fuzu, LinkedIn);

class Dev extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      jobs: [].concat(iHub, Fuzu, LinkedIn)
    };

    this.filterJobs = this.filterJobs.bind(this);
    this.filterDev = this.filterDev.bind(this);
  }



  componentWillMount() {

    this.filterDev();
  }

  filterJobs(array, string) {
    return array.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  }

  filterDev() {
    var newJobs = this.filterJobs(allJobs, 'dev');
    console.log("dev jobs " + newJobs);

    this.setState({
      jobs: newJobs
    });
  }



  render() {



    

    const joblist = this.state.jobs.map((job, keyIndex) =>
      
        <li key={keyIndex} className="job-card">
          <a className="job-link" href={job["url"]} target="_blank">
            <div className="twelve columns">
              <div className="job-details">
                <h3 className="job-title">{job["jobTitle"]} <i>at</i> <span>{job["company"]}</span></h3>
                <span className="job-action"><i className="fa fa-thumbs-up"></i></span> | 
                <span className="job-source">By {job["source"]} </span> |
                <span className="job-stamp"> Added {job["date"]} </span>
              </div>
            </div>
          </a>
        </li>
      );

    return(


        <section id="jobs-board" className="jobs-board">
            <div className="row">
              <ol>
                {joblist}
              </ol> 
            </div>
        </section>
      );
  }
}


export default Dev;