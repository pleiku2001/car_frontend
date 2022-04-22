import React from "react";
import styled from "styled-components";
import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutt } from "../redux/apiCalls";
import { useState } from "react";

function Navbar() {
  const Container = styled.div`
    height: 60px;
    background-color: ${(props) =>
      props.click ? props.theme.body : props.theme.text};
    color: ${(props) => (props.click ? props.theme.text : props.theme.body)};
  `;
  const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
  `;
  const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
  `;

  const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
  `;

  const Input = styled.input`
    border: none;
    padding: 2px;
  `;

  const Center = styled.div`
    flex: 1;
    text-align: center;
  `;

  const Logo = styled.h1`
    font-weight: bold;
    color: ${(props) => (props.click ? props.theme.text : props.theme.body)};
  `;
  const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `;

  const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    text-decoration: none;
  `;
  const Link = styled.a`
    text-decoration: none;
    /* color: black; */
    color: ${(props) => (props.click ? props.theme.text : props.theme.body)};
  `;
  const Btn = styled.button`
    margin: 5px;
    width: 100px;
    height: 25px;
    font-weight: bold;
    background-color: black;
    color: white;
    border-radius: 3px;
    &:hover {
      background-color: white;
      color: black;
      cursor: pointer;
    }
  `;
  const quantity = useSelector((state) => state.cart.quantity);

  let user = useSelector((state) => state.user.currentUser || false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/");
    logoutt(dispatch);
  };
  const [click, setClick] = useState(false);
  const handleMode = () => {
    localStorage.setItem("mode", !click);
    setClick(!click);
  };

  return (
    <Container click={click}>
      <Wrapper>
        <Left>
          <Language>VN</Language>
          <Btn onClick={handleMode}>Dark Mode</Btn>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 14, marginLeft: 3 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Logo>
            {" "}
            <Link href="/" to="/" click={click}>
              SHOP CAR
            </Link>
          </Logo>
        </Center>
        <Right>
          {user ? (
            <>
              <MenuItem>
                <Link href="/profile">{user.username.toUpperCase()}</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/" onClick={handleClick} click={click}>
                  LOGOUT
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link href="/register" to="/register">
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/login" to="/login">
                  LOGIN
                </Link>
              </MenuItem>
            </>
          )}

          <Link href="/cart" to="/cart">
            <MenuItem>
              <Badge
                badgeContent={quantity}
                color="primary"
                click={click}
                style={{
                  color: click ? "black" : "white",
                }}
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
