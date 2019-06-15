import React from 'react';

interface IProps
{ }

export const Card : React.FunctionComponent<IProps> = (props) =>
{
  return (
    <div className="card">
      { props.children }
    </div>
  )
}
