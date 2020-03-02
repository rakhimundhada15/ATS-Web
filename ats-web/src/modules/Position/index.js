import React from 'react';
import PositionApp from './PositionApp';

const Position = () => (
    <PositionApp></PositionApp>
);

export default {
    routeProps: {
        path: '/position',
        component: Position
    },
    name: 'Position',
}