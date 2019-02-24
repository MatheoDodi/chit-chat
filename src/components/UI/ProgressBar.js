import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = ({ uploadState, percentUploaded }) =>
  uploadState === 'uploading' && (
    <Progress
      style={{ marginTop: '5px' }}
      percent={percentUploaded}
      progress
      indicating
      size='medium'
      inverted
    />
  );

export default ProgressBar;
