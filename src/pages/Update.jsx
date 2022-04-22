import React from "react";
import { Announcement, Footer, Navbar } from "../components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {userRequest,publicRequest} from "../request"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutt } from "../redux/apiCalls";

const Container = styled.div`
  height: 90vh;
  width: 100%;
  padding: 20px;
  /* background-color: red; */
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`;
const Info = styled.input`
  /* border: 20px; */
  width: 150px;
  border: 1px solid black;
  /* margin: 20px auto; */
  margin: 10px;
  padding: 10px;
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
  display: flex;
  flex-direction: column;
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

function Update() {
  const user = useSelector((state) => state.user);
  // email name lastname number address username
  const [number,setNumber] = useState()
  const [name,setName] = useState()
  const [address,setAddress] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch();

//   publicRequest.get("/products");
    // console.log(TOKEN);

// console.log(user.currentUser._id)
  const handleUpdate = async (e)=>{
    e.preventDefault();
    try {
        const res = await axios.put(`https://carappreactjs.herokuapp.com/api/users/${user.currentUser._id}`, {
          name: name,
          number: number,
          address: address,
        });

        console.log(res)
    } catch (error) {
        console.log(error);
        // setError(true)
    }
    logoutt(dispatch);
    navigate("/login")
  }
  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Title>Update Profile</Title>
        <Center>
          <Table>
            {/* <Info>Email: {user.currentUser.email}</Info>
            <Info>Name: {user.currentUser.name}</Info>
            <Info>Last name: {user.currentUser.lastName}</Info>
            <Info>Number: {user.currentUser.number}</Info>
            <Info>Address: {user.currentUser.address}</Info>
            <Info>Username: {user.currentUser.username}</Info> */}
            Number: <Info  placeholder={user.currentUser.number} onChange={(e)=>setNumber(e.target.value)}/>
            Email: <Info  placeholder={user.currentUser.email} onChange={(e)=>setName(e.target.value)}/>
            Address: <Info  placeholder={user.currentUser.address} onChange={(e)=>setAddress(e.target.value)}/>
            {/* <input type="text" placeholder="" />  */}
          </Table>
          <Img src="https://cdn.pixabay.com/photo/2016/09/02/08/32/cuba-1638594__340.jpg"></Img>
        </Center>
        <Button onClick={handleUpdate}>Update</Button>
      </Container>
      <Footer />
    </>
  );
}

export default Update;
