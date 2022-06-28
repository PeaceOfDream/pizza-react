import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader className='pizza-block'
    speed={2}
    width={280}
    height={450}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    >
    <circle cx="134" cy="130" r="125" />
    <rect x="0" y="345" rx="7" ry="7" width="280" height="80" />
    <rect x="4" y="295" rx="12" ry="12" width="280" height="24" />
    <rect x="0" y="450" rx="13" ry="13" width="95" height="30" />
    <rect x="126" y="440" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);
