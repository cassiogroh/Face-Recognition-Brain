import React from 'react';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 400
            }
        }
    }
}

const ParticlesBg = () => {
    return (
        <Particles
            className='particles'
            params={particlesOptions}
        />
    );
};

export default ParticlesBg;