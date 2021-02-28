import React, { FC, useMemo } from 'react';

interface IDivider {
  verticalSpacer?: number;
  horizontalSpacer?: number;
  style?: React.CSSProperties;
}

export const Divider: FC<IDivider> = ({
  verticalSpacer,
  horizontalSpacer,
  style,
}) => useMemo(() => (
  <div
    className="divider"
    style={{
      marginTop: typeof verticalSpacer === 'number' ? verticalSpacer : 10,
      marginBottom: typeof verticalSpacer === 'number' ? verticalSpacer : 30,
      marginLeft: typeof horizontalSpacer === 'number' ? horizontalSpacer : 0,
      marginRight: typeof horizontalSpacer === 'number' ? horizontalSpacer : 0,
      ...style,
    }}
  />
), [verticalSpacer, horizontalSpacer]);
