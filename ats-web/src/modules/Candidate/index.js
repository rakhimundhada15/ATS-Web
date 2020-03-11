import React from 'react';
import CandidateApp from './CandidateApp';
import EmployeeContextProvider from './../../contexts/EmployeeContextProvider';

const Candidate = () => (
    <EmployeeContextProvider>
        <CandidateApp></CandidateApp>
    </EmployeeContextProvider>
);

export default {
    routeProps: {
        path: '/candidate',
        component: Candidate
    },
    name: 'Candidate',
}