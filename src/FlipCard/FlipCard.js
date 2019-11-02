import React from 'react';
import './css.css';

export const FlipableCell = ({ textFront, textBack, isTooltipVisible }) =>
    <div className="flipCellContainer">
        <div className={isTooltipVisible ? "flipCellInner" : "flipCellNoTooltip"}>
            <div className="flipCellFront">
                {textFront}
            </div>
            <div className="flipCellBack">
                {textBack}
            </div>
        </div>
    </div>