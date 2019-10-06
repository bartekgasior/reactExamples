import React from 'react';
import PACMAN from './gifs/pacman.gif';
import Spinner_1 from './gifs/spinner1.gif';
import Loading from './gifs/loading.gif';

export const PacmanSpinner = () =>
    <div style={{textAlign: 'center'}}>
        <img src={PACMAN} alt="pacman" />
    </div>

export const Spinner1 = () =>
    <div>
        <img src={Spinner_1} alt="spinner1" />
    </div>

export const LoadingText = () =>
    <div>
        <img src={Loading} alt="loadingText" />
    </div>