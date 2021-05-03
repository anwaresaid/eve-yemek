import styled from "styled-components";
export const DashboardWrapper = styled.div`
  .box {
    text-align: center;
    border-radius: 4px;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
      Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-weight: normal;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .box__info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    color: #fff;
  }
  .box__info p {
    font-size: 1rem;
    line-height: 1.5;
  }
  .box__info span {
    font-size: 30px;
    font-weight: bolder;
    margin-bottom: 10px;
    margin-left: -50px;
  }
  .box__icons {
    margin-right: 20px;
  }
  .box__icons i {
    opacity: 0.2;
    color: #495057;
    font-size: 4em;
  }
`;
