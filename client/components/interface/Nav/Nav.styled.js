import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: right;
  background-color: ${({ theme }) => theme.primaryLight};

  height: ${({ theme }) => theme.dimensions.nav.height};
  width: 100%;
  box-shadow: 0 1px 3px #5d5d637e;
  position: fixed;
  z-index: 150;
  image {
    justify-content: flex-start;
    align-self: center;
  }
  a {
    justify-content: flex-end;
    text-decoration: none;
    color: #5d5d63;
    margin: auto 20px;
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
    align-self: center;
  }
`;
