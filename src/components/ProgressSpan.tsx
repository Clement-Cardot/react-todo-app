import React from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
    nbTasks: number;
    nbTasksDone: number;
}

const ProgressSpan: React.FC<Props> = (props: Props) => {

    return (
        <div style={{width: 40, height: 40}}>
            <CircularProgressbar 
                maxValue={1} 
                value={props.nbTasksDone / props.nbTasks} 
                text={`${props.nbTasksDone}/${props.nbTasks}`}
                strokeWidth={15}
                styles={buildStyles({
                    pathColor: '#2ECC71',
                    textColor: '#2ECC71',
                    textSize: '1.5rem',
                })}/>
        </div>
    );
};

export default ProgressSpan;