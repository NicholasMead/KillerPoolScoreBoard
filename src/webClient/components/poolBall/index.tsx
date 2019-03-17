import * as React from 'react';

interface IProps {
    colour: "red" | "yellow" | "white" | "black",
    size: string;
}

export const PoolBall = (props: IProps) => {
    var colour: string;
    switch (props.colour) {
        default:
        case "black":
            colour = "#000";
            break;

        case "white":
            colour = "#fff";
            break;

        case "red":
            colour = "#ba2d0b";
            break;

        case "yellow":
            colour = "#f4e542";
            break;
    }

    const style = {
        backgroundColor: colour,
        width: props.size,
        minWidth: props.size,
        height: props.size,
        minHeight: props.size,
        borderRadius: "50%"
    }

    return (
        <div className="poolBall" style={style}></div>
    )
}