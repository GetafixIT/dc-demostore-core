import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { bp } from "@Styles/breakpoints";

export const ShoppableVideoWrapper = styled.div`
  position: relative;
`;

export const AnimationCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;

  a.hotspot {
    position: absolute;
    border: 1px solid white;
    background-color: rgba(0, 41, 131, 0.33);
    top: 0;
    left: 0;
    transition: background-color 0.33s, opacity 0.33s;
    border-radius: 50%;
    cursor: pointer;

    width: 20px;
    height: 20px;
    margin: -10px;

    ${bp.tablet} {
      width: 26px;
      height: 26px;
      margin: -13px;
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
      width: 26px;
      height: 26px;
    }
  }

  > div:not(.amp-vis-page) {
    pointer-events: all;
  }

  .tooltip {
    position: relative;
    pointer-events: all;
  }

  .caption {
    position: absolute;
    background: #fff;
    border-radius: 2px;
    padding: 8px;
    pointer-events: all;
    text-decoration: none;
    font-size: 1.2rem;
    color: #000;
    filter: drop-shadow(1px 2px 0.2rem rgba(100, 100, 100, 0.7));
    z-index: 2;
  }

  .marker {
    position: absolute;
    border: 1px solid white;
    background-color: rgba(0, 41, 131, 0.33);
    transition: background-color 0.33s, opacity 0.33s;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    pointer-events: all;
    margin: -20px 0 0 -20px;
    z-index: 2;

    &.play {
      animation-play-state: running;
    }
  }

  .joinLine {
    margin-top: -1px;
    height: 2px;
    position: absolute;
    transform-origin: left;
    background: linear-gradient(to right, transparent 50%, #ccc 50%);
    background-size: 8px 2px;
    z-index: 1;
  }
`;
