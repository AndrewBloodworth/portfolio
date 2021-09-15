import styled from "styled-components";

export const StyledImage = styled.figure`
  figure {
    height: ${({ size, logo }) => (logo ? "50px" : size.height)};
    width: ${({ size }) => size.width};
    background-size: cover;
    -webkit-background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: ${({ url }) => `url("${url}")`};
  }
`;
