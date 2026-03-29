import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loading">
        {/* Added viewBox so the SVG can scale to any size smoothly */}
        <svg viewBox="0 0 64 48">
          <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back" />
          <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front" />
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .loading {
    /* Increased the size significantly so it's clearly visible */
    width: 250px;
    height: auto;
  }

  .loading svg {
    width: 100%;
    height: 100%;
    /* Added a subtle drop shadow to make the blue pop off the gray background */
    filter: drop-shadow(0px 8px 12px rgba(37, 99, 235, 0.2));
  }

  .loading svg polyline {
    fill: none;
    /* You can increase this stroke-width if you want a thicker line */
    stroke-width: 3; 
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .loading svg polyline#back {
    /* Faded background track in RegRadar Blue */
    stroke: rgba(37, 99, 235, 0.15); 
  }

  .loading svg polyline#front {
    /* Active animated line in RegRadar Core Blue */
    stroke: #2563eb; 
    stroke-dasharray: 48, 144;
    stroke-dashoffset: 192;
    animation: dash_682 1.4s linear infinite;
  }

  @keyframes dash_682 {
    72.5% {
      opacity: 0;
    }

    to {
      stroke-dashoffset: 0;
    }
  }
`;

export default Loader;