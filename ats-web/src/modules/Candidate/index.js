import React from 'react';
import CandidateApp from './CandidateApp';

const Candidate = () => (
    <CandidateApp></CandidateApp>
);

export default {
    routeProps: {
        path: '/candidate',
        component: Candidate
    },
    name: 'Candidate',
}