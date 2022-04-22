import React from "react";
import { Announcement, Footer, Navbar } from "../components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Container = styled.div`
  height: 90vh;
  width: 100%;
  padding: 20px;
  /* background-color: red; */
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const Info = styled.div`
  /* border: 20px; */
  width: 80%;
  border-top: 1px solid black;
  margin: 20px auto;
  padding-top: 20px;
`;
const Center = styled.div`
  display: flex;
`;
const Img = styled.img`
    flex: 2;
    /* width: 100px; */
`;

const Table = styled.div`
  /* width: 30%; */
  flex: 2;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: black;
    color: white;
  }
`;
// const Title = styled.div``

function Profile() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  // email name lastname number address username
  console.log(user.currentUser);

  const handleClick = ()=>{
    navigate("/update")
  }

  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Title>Profile</Title>
        <Center>
          <Table>
            <Info>Email: {user.currentUser.email}</Info>
            <Info>Name: {user.currentUser.name}</Info>
            <Info>Last name: {user.currentUser.lastName}</Info>
            <Info>Number: {user.currentUser.number}</Info>
            <Info>Address: {user.currentUser.address}</Info>
            <Info>Username: {user.currentUser.username}</Info>
          </Table>
          <Img src="https://cdn.pixabay.com/photo/2016/09/02/08/32/cuba-1638594__340.jpg"></Img>
        </Center>
        <Button onClick={handleClick}>Update</Button>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
