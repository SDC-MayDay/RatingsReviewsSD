/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 150 },
    { duration: '30s', target: 500 },
    { duration: '45s', target: 1000 },
    { duration: '60s', target: 2500 },
    { duration: '60s', target: 3000 },
    { duration: '30s', target: 1000 },
    { duration: '20s', target: 100 },
  ],
};
export default () => {
  http.get('http://localhost:3000/reviews/548383');
  sleep(1);
};
