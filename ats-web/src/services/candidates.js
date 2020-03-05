const candidateList = [
    {
        "id": 1,
        "firstName": "Candidate xyz",
        "email": "candidate1@xyz.com",
        "skills": [
          "Java",
          "Mysql"
        ],
        "experience": 3,
        "address": "Baner,Pune",
        "mobileNumber": 9089989890,
        "source": "referral",
        "resume": "resume.pdf",
        "status": "shortlisted",
        "currentCtc": 4.5,
        "expectedCtc": 6,
        "currentOrganisation": "xyz",
        "noticePeriod": "15 days",
        "referrer": "employee2"
    },
    {
        "id": 2,
        "firstName": "Candidate abc",
        "email": "candidate2@abc.com",
        "skills": [
          "c#",
          "MS-sql"
        ],
        "experience": 6,
        "address": "Baner,Pune",
        "mobileNumber": 8987675645,
        "source": "referral",
        "resume": "resume.pdf",
        "status": "shortlisted",
        "currentCtc": 10,
        "expectedCtc": 13,
        "currentOrganisation": "ABC",
        "noticePeriod": "45 days",
        "referrer": "employee1"
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