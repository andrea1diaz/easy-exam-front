import ContentLoader from 'react-content-loader';
import React from 'react';

const LoadingBasicLayout = (props) => (
  <ContentLoader
    height={850}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="6.47" y="20" rx="8" ry="8" width="140" height="25" />
    {/* SCROLL 1 */}
    <rect x="6.47" y="80" rx="8" ry="8" width="120" height="15.61" />
    <rect x="7.63" y="106.58" rx="7" ry="7" width="220" height="200" />
    <rect x="254.63" y="106.58" rx="7" ry="7" width="220" height="200" />
    {/* SCROLL 2 */}
    <rect x="6.47" y="330" rx="8" ry="8" width="120" height="15.61" />
    <rect x="7.63" y="356.58" rx="7" ry="7" width="220" height="200" />
    <rect x="254.63" y="356.58" rx="7" ry="7" width="220" height="200" />
    {/* SCROLL 3 */}
    <rect x="6.47" y="580" rx="8" ry="8" width="120" height="15.61" />
    <rect x="7.63" y="606.58" rx="7" ry="7" width="220" height="200" />
    <rect x="254.63" y="606.58" rx="7" ry="7" width="220" height="200" />
  </ContentLoader>
);

export default LoadingBasicLayout;

