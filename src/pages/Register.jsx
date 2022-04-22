import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
  /* linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), */ url("https://cdn.pixabay.com/photo/2014/06/04/16/36/man-362150__340.jpg")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #000000;
  color: white;
  cursor: pointer;
`;
const Link = styled.a`
  margin: auto;
  text-decoration: none;
  color: black;
  &:hover{
    text-decoration: underline;
  }
`
function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (email === "" || name === ""|| lastName === ""|| userName === ""|| password === ""|| address === ""|| number === "") {
      console.log("error");
      setError(true)
    } else {
      try {
        const res = await axios.post("https://carappreactjs.herokuapp.com/api/auth/register", {
          username: userName,
          email: email,
          password: password,
          name: name,
          lastName: lastName,
          number: number,
          address: address,
        });

        // console.log(res)
        navigate("/login");
      } catch (error) {
        console.log(error);
        setError(true)
      }
    }
  };

  // console.log(name,lastName,userName,email,password,rePassword)

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <Input
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            <p style={{color: "red"}}>

            {error ? "Wrong infomation or username and email already signed": ""}
            </p>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
          <Link href={"./login"}>LOGIN</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
