import React, { FC } from 'react';

interface IDivider {
  verticalSpacer?: number;
  horizontalSpacer?: number;
}

export const Divider: FC<IDivider> = ({ verticalSpacer, horizontalSpacer }) => {
  const style = {
    marginTop: typeof verticalSpacer === 'number' ? verticalSpacer : 10,
    marginBottom: typeof verticalSpacer === 'number' ? verticalSpacer : 30,
    marginLeft: typeof horizontalSpacer === 'number' ? horizontalSpacer : 0,
    marginRight: typeof horizontalSpacer === 'number' ? horizontalSpacer : 0,
  };
  return (
    <div className="divider" style={style} />
  );
};
