//import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

var iHub =[
    {
        "jobTitle": "Unity Game Designer/ Developer",
        "company": "Unity Game Designer/ Developer",
        "source": "iHUB",
        "date": "8th Sep 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Senior Frontend Developer",
        "company": "Senior Frontend Developer",
        "source": "iHUB",
        "date": "27th Aug 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Product Manager",
        "company": "Product Manager",
        "source": "iHUB",
        "date": "7th Sep 2018",
        "category": "Manager"
    },
    {
        "jobTitle": "Web Developer",
        "company": "Web Developer",
        "source": "iHUB",
        "date": "6th Sep 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Technical Support Analyst",
        "company": "Technical Support Analyst",
        "source": "iHUB",
        "date": "5th Sep 2018",
        "category": "Other"
    },
    {
        "jobTitle": "IOT | Fullstack Developer",
        "company": "IOT | Fullstack Developer",
        "source": "iHUB",
        "date": "5th Sep 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Lumen Labs - Program Director",
        "company": "Lumen Labs - Program Director",
        "source": "iHUB",
        "date": "2nd Sep 2018",
        "category": "Manager"
    },
    {
        "jobTitle": "React Native Developer",
        "company": "React Native Developer",
        "source": "iHUB",
        "date": "2nd Sep 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "CodeIgniter Developer",
        "company": "CodeIgniter Developer",
        "source": "iHUB",
        "date": "2nd Sep 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Python/Django developer",
        "company": "Python/Django developer",
        "source": "iHUB",
        "date": "23rd Jun 2017",
        "category": "Developer"
    },
    {
        "jobTitle": "User Experience Designer",
        "company": "User Experience Designer",
        "source": "iHUB",
        "date": "28th Jun 2018",
        "category": "Designer"
    },
    {
        "jobTitle": "Senior Software Engineer",
        "company": "Senior Software Engineer",
        "source": "iHUB",
        "date": "28th Aug 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Senior software engineer - Android",
        "company": "Senior software engineer - Android",
        "source": "iHUB",
        "date": "28th Aug 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Android developer",
        "company": "Android developer",
        "source": "iHUB",
        "date": "17th Jul 2018",
        "category": "Other"
    },
    {
        "jobTitle": "JAVA DEVELOPER",
        "company": "JAVA DEVELOPER",
        "source": "iHUB",
        "date": "22nd Aug 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Product Manager",
        "company": "Product Manager",
        "source": "iHUB",
        "date": "20th Aug 2018",
        "category": "Manager"
    },
    {
        "jobTitle": "Software Sales Executive",
        "company": "Software Sales Executive",
        "source": "iHUB",
        "date": "14th Aug 2018",
        "category": "Sales"
    },
    {
        "jobTitle": "Frontend Software Engineer - FinTech",
        "company": "Frontend Software Engineer - FinTech",
        "source": "iHUB",
        "date": "14th Aug 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "BRCK | Senior Software Engineer (Full Stack)",
        "company": "BRCK | Senior Software Engineer (Full Stack)",
        "source": "iHUB",
        "date": "13th Aug 2018",
        "category": "Technical Lead"
    },
    {
        "jobTitle": "Senior Developer",
        "company": "Senior Developer",
        "source": "iHUB",
        "date": "8th Aug 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Seeking an intermediate PHP/Laravel developer",
        "company": "Seeking an intermediate PHP/Laravel developer",
        "source": "iHUB",
        "date": "7th Aug 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Creative Technologist (Part Time/Full Time)",
        "company": "Creative Technologist (Part Time/Full Time)",
        "source": "iHUB",
        "date": "3rd Aug 2018",
        "category": "Technical Lead"
    },
    {
        "jobTitle": "Quality Assurance Engineer (m/f)",
        "company": "Quality Assurance Engineer (m/f)",
        "source": "iHUB",
        "date": "18th Jul 2018",
        "category": "Developer"
    },
    {
        "jobTitle": "Junior Quality assurance specialist (ICT sector)",
        "company": "Junior Quality assurance specialist (ICT sector)",
        "source": "iHUB",
        "date": "21st Nov 2017",
        "category": "Other"
    }
];




var getIhub = function () {

axios.get('https://ihub.co.ke/jobs')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let ihubList = [];
            $('.jobsboard-row').each(function(i, elem) {
                ihubList[i] = {
                    jobTitle: $(this).find('h3').text(),
                    company: $(this).find('h3').text(),
                    source: "iHUB",
                    date: $(this).find('.job-time').text(),
                    category: $(this).find('.job-cat').text()

                }
            });
            iHub = ihubList.filter(n => n != undefined);
            // const ihubListTrimmed = ihubList.filter(n => n != undefined)
            // fs.writeFile('ihubList.json',
            //     JSON.stringify(ihubListTrimmed, null, 4),
            //     (err) => console.log('ihubListTrimmed File successfully written!'))
        }
    }, (error) => console.log("err"));
}

getIhub();



export default iHub;