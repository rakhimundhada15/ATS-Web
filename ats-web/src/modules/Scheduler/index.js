import React from 'react';
import SchedulerApp from './SchedulerApp';

const Scheduler = () => (
    <SchedulerApp></SchedulerApp>
);

export default {
  routeProps: {
    path: '/scheduler',
    component: Scheduler
  },
  name: 'Scheduler',
}