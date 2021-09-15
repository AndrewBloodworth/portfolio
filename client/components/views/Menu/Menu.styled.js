import styled from "styled-components";

export const StyledMenu = styled.aside`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.primaryLight};
  height: ${({ theme }) =>
    `${`calc(100vh - ${theme.dimensions.footer.height})`}`};
  box-shadow: inset 0 0 3px #5d5d637e;
  width: 0px;
  padding-top: ${({ theme }) => theme.dimensions.nav.height};
  left: 0;
  z-index: 10;
  overflow: hidden;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.burger};
  width: ${({ open }) => (open ? `${`calc(200px + 2rem)`}` : "0")};

  div {
    text-align: center;
    flex-direction: column;
    section {
    }
  }
  div:hover {
    border: solid;
    font-weight: bold;
    hover-weight: bold;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
  header {
    ul > li {
      list-style-type: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    #page-1 {
      color: ${({ theme }) => theme.colors.darkGray};
      font-size: 1.17em;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
    }
  }
`;
