import * as React from 'react';
import { PoolBall } from '../poolBall';
import './poolRack.sass';
import { checkPropTypes } from 'prop-types';

interface IProps {
    id?: string,
    ballSize: string
}

export const PoolRack: React.StatelessComponent<IProps> = props => {
    const style = {
        width: `calc(${props.ballSize} * 5)`,
        height: `calc(${props.ballSize} * 4 * 0.866 + ${props.ballSize})`,
    }

    return(
        <div className="poolRack" style={style} id={props.id}>
            <PoolRow {...props}>   
                <PoolBall size={props.ballSize} colour="red" />
            </PoolRow>
            <PoolRow {...props }>   
                <PoolBall size={props.ballSize} colour="yellow" />
                <PoolBall size={props.ballSize} colour="red" />
            </PoolRow>
            <PoolRow {...props }>   
                <PoolBall size={props.ballSize} colour="red" />
                <PoolBall size={props.ballSize} colour="black" />
                <PoolBall size={props.ballSize} colour="yellow" />
            </PoolRow>
            <PoolRow {...props }>   
                <PoolBall size={props.ballSize} colour="yellow" />
                <PoolBall size={props.ballSize} colour="red" />
                <PoolBall size={props.ballSize} colour="yellow" />
                <PoolBall size={props.ballSize} colour="red" />
            </PoolRow>
            <PoolRow {...props }>   
                <PoolBall size={props.ballSize} colour="red" />
                <PoolBall size={props.ballSize} colour="yellow" />
                <PoolBall size={props.ballSize} colour="yellow" />
                <PoolBall size={props.ballSize} colour="red" />
                <PoolBall size={props.ballSize} colour="yellow" />
            </PoolRow>
        </div>
    )
}

const PoolRow : React.StatelessComponent<IProps> = props => {
    return (
        <div className="poolRow" style={{height: `calc(${props.ballSize} * 0.866)`}}>
            {props.children}
        </div>
    )
}