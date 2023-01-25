import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

export const bounce = keyframes`
  0% {
    transform: translate3d(0,0,0);
  }

  3.55% {
    transform: translate3d(0, -30px, 0);
  }

  5.95% {
    transform: translate3d(0, -15px, 0);
  }

  
`

export const AnimationCanvas = styled.div`

  > div:not(.amp-vis-page){
    pointer-events: all;
  }

  @keyframes bounce {
    0% {
      left: 49.83%;
      top: 47.95%;
    }

    3.55% {
      left: 43.54%;
      top: 66.31%;
    }

    5.95% {
      left: 39.30%;
      top: 57.06%;
      opacity: 1;
    }
    
    6%, 100%{
      left: 39.30%;
      top: 57.06%;
      opacity: 0;
    }
  }
  
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
    
  .tooltip{
    position: relative;
    pointer-events: all;
  }
  
  .caption{
    position: absolute;
    margin: 0 0 0 -100px;
    background: #fff;
    border-radius: 2px;
    padding: 5px;
    pointer-events: all;
  }
  
  .marker{
    position: absolute;
    border: 1px solid white;
    background-color: rgba(0, 41, 131, 0.33);
    transition: background-color 0.33s, opacity 0.33s;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    pointer-events: all;
    margin: -20px 0 0 -20px;
    //animation-name: bounce;
    //animation-duration: 54.687s;
    //animation-iteration-count: infinite;
    //animation-play-state: paused;
    
    &.play{
      animation-play-state: running;
    }
  }
`
