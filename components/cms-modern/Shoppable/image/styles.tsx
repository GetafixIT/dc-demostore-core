import styled from "@emotion/styled";

import { bp } from "@Styles/breakpoints";

export const ShoppableImageWrapper = styled.div`
  position: relative;

  .image {
    width: 100%;
    height: auto;
    opacity: 1;
    transition: opacity 0.33s;
    position: absolute;
  }

  .image--hide {
    opacity: 0;
  }

  .interactive {
    position: absolute;
    top: 0;
    left: 0;
  }

  .focalpoint {
    position: absolute;
    border: 1px dashed rgba(255, 255, 255, 0.75);
    background-color: rgba(0, 0, 0, 0.25);
    transition: opacity 0.33s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .focalcircle {
    border: 1px solid white;
    background-color: black;

    opacity: 0.33;
    width: 40%;
    height: 40%;

    border-radius: 50%;
  }

  .focalpoint--hidden {
    opacity: 0;
  }

  a.hotspot {
    position: absolute;
    border: 1px solid white;
    background-color: rgba(0, 41, 131, 0.33);
    transition: background-color 0.33s, opacity 0.33s;
    border-radius: 50%;
    cursor: pointer;

    width: 20px;
    height: 20px;
    margin: -10px;

    ${bp.tablet} {
      width: 40px;
      height: 40px;
      margin: -20px;
    }

    &.hidden {
      opacity: 0;
    }
  }

  .hotspotplus {
    fill: white;

    width: 20px;
    height: 20px;

    ${bp.tablet} {
      width: 40px;
      height: 40px;
    }
  }

  .polygon {
    position: absolute;
    //stroke: white;
    //stroke-dasharray: 2;
    fill: rgba(0, 41, 131, 0.33);
    transition: fill 0.33s, opacity 0.33s;

    &.hidden {
      opacity: 0;
    }
  }

  .polygon--selected {
    fill: rgba(0, 153, 255, 0.33);
    outline: 1px solid #039be5;
    z-index: 1;
  }
`;
