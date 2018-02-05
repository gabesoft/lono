import * as React from 'react';

import getIcon from 'client/services/icon';

type Props = {
  hasMore: boolean
};

const MoreLoader = ({ hasMore }: Props) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="more-loader">
      {getIcon('download')}
      <span>Loading...</span>
    </div>
  );
};

export default MoreLoader;