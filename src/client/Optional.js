import * as React from 'react';

type Props = {
  children: React.Node,
  canRender: boolean
}

const Optional = (props: Props) => {
  return (
    props.canRender ? props.children : null
  );
};

export default Optional;