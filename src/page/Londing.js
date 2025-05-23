import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* เต็มจอแนวตั้ง */

  .loader {
    width: 7em;
    height: 5em;
    position: relative;
    animation: beat 1s infinite;
  }

  .loader::before,
  .loader::after {
    content: "";
    position: absolute;
    top: 0;
    width: 50px;
    height: 80px;
    border-radius: 5em 5em 0 0;
    animation: coldblue 1s infinite;
  }

  .loader::before {
    left: 50px;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }

  .loader::after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }

  @keyframes beat {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes coldblue {
    0%, 100% {
      background-color: rgb(255, 255, 255);
    }

    50% {
      background-color: rgb(198, 23, 23);
    }
  }
`;


export default Loading;
