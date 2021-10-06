import { CircularProgress } from '@mui/material';
import React from 'react';
// import loading from '../../images/loading.gif';

import style from './loading.module.scss';

function Loading() {
  return (
    <div className={ style.loading }>
      <CircularProgress />
    </div>
  );
}

export default Loading;
