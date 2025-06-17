import XRay from 'aws-xray-sdk-core';
import aws from 'aws-sdk';

const AWS = XRay.captureAWS(aws);

export default AWS;
