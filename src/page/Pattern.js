import React from 'react';
import styled from 'styled-components';

const Pattern = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="container" />
      <div className="content">{children}</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;

  .container {
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    --s: 90px;
    --c-half-left: hsl(10, 50%, 50%);
    --c-half-right: hsl(40, 50%, 80%);
    --c-bottom: hsl(180, 50%, 50%);
    background: conic-gradient(
      var(--c-half-left) 0deg,
      var(--c-half-left) 120deg,
      var(--c-bottom) 120deg,
      var(--c-bottom) 240deg,
      var(--c-half-right) 240deg
    );
    background-size: var(--s);
  }

  .content {
    position: relative;
    z-index: 1;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Pattern;
