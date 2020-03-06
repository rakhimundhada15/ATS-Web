import React, { useState, useEffect } from 'react';
import { Popconfirm, message } from 'antd';
import PositionApp from '../Position/PositionApp'
import PropTypes from "prop-types";

function Delete(props) {
  function confirm(e) {
    props.onYes(props.item);
  }

  function cancel(e) {
    if(props.OnCancel)
    props.OnCancel(e);
  }

  return (
    <Popconfirm
      title="Are you sure?"
      onConfirm={confirm}
      onCancel={cancel}
    >
      <a>Delete</a>
    </Popconfirm>
  );

}

Popconfirm.PropTypes ={
  onYes : PropTypes.func.isRequired
}
export default Delete;