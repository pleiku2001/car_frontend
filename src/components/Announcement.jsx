import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

function Announcement() {

  const Container = styled.div`
    height: 30px;
    background-color: #000000;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
  `;
  return <Container  
   
 >Super Deal! Free Shipping on Orders Over $50</Container>;
}

export default Announcement;
