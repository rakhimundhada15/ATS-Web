import React, { useState, useEffect } from 'react';
import { Popconfirm, message } from 'antd';
import PropTypes from "prop-types";

function Delete(props) {
  function confirm(e) {
    props.onYes(props.item);
  }

  function cancel(e) {
    if (props.OnCancel) {
      props.OnCancel(e);
    }
  }

  return (
    <Popconfirm
      onYes={confirm}
      title="Are you sure?"
      onConfirm={confirm}
      onCancel={cancel}
    >
      <a>Delete</a>
    </Popconfirm>
  );

}

Popconfirm.propTypes ={
  onYes : PropTypes.func.isRequired
}
export default Delete;