import styled from "@emotion/styled";

export const FaqWrapper = styled.div`
  margin: 20px 0;
`

export const Details = styled.details`
  
    border-bottom: 1px solid #ebebeb;
    padding: 0;
    margin-bottom: 4px;

    > div{
      height: 0;
      overflow: hidden;
    }

    summary {
      position: relative;
      cursor: pointer;
      list-style: none;
      font-size: 20px;
      color: #092a5e;
      background: #f3f0ec;
      outline: none;
      padding: 15px 65px 15px 15px;
      text-transform: uppercase;

      svg {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 13px;
        right: 18px;
      }

      &::-webkit-details-marker {
        display: none;
      }

      > * {
        display: inline;
      }
      
      
    }

    &[open] {

      > div{
        height: auto;
        padding: 15px;
        overflow: visible;
      }
      
      summary {
        svg {
          transform: rotate(180deg);
        }
      }
    }

    ul {
      padding: 0 0 0 1.5rem;

      li {
        font-size: 16px;

        ul {
          padding: 1rem 0 0 2rem;

          li {
            list-style: none;
            position: relative;
          }
        }
      }
    }
  
`
