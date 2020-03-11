const candidateList = [
    {
        "id": 9,
        "name": "Candidate xyz",
        "email": "candidate1@xyz.com",
        "skills": [
          "Java",
          "Mysql"
        ],
        "experience": 3,
        "address": "Baner,Pune",
        "mobileno": 9089989890,
        "source": "referral",
        "resume": "resume.pdf",
        "status": "shortlisted",
        "current_ctc": 4.5,
        "expected_ctc": 6,
        "current_organization": "xyz",
        "notice_period": "15 days",
        "reffered_by": "employee2"
    },
    {
        "id": 2,
        "name": "Candidate abc",
        "email": "candidate2@abc.com",
        "skills": [
          "c#",
          "MS-sql"
        ],
        "experience": 6,
        "address": "Baner,Pune",
        "mobileno": 8987675645,
        "source": "referral",
        "resume": "resume.pdf",
        "status": "shortlisted",
        "current_ctc": 10,
        "expected_ctc": 13,
        "current_organization": "ABC",
        "notice_period": "45 days",
        "reffered_by": "employee1"
    },
];

export const getCandidateToList = () => {
    return candidateList;
}

export const getCandidateById = (candidateId) => {
    return candidateList.find(c=>c.id===candidateId);
}

export const addCandidate = (newCandidate) => {
    newCandidate.id = candidateList.length + 1;
    candidateList.push(newCandidate);
}

const listOfScheduleInterview =[
        {
          "channel": "F2F",
          "comment": "NA",
          "employee_id": 2,
          "feedback": "NA",
          "id": 1,
          "job_has_candidate_id": 2,
          "location": "Niyuj HQ",
          "schedule_time": "Wed, 26 Dec 2018 04:34:52 GMT"
        },
        {
          "channel": "F2F",
          "comment": "NA",
          "employee_id": 3,
          "feedback": "NA",
          "id": 2,
          "job_has_candidate_id": 3,
          "location": "Niyuj HQ",
          "schedule_time": "Wed, 26 Dec 2018 04:34:52 GMT"
        }
      
];

export const getScheduleIntervioewList = () => {
    return listOfScheduleInterview;
}