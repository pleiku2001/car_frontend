import React, { useState } from "react";
import styled from "styled-components";
// import { Announcement } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Footer, Navbar, Announcement } from "../components";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../request";
import { deleteProduct } from "../redux/cartRedux";
import axios from "axios";

const KEY =
  "pk_test_51KNKHXK40Ml6IeB3jyW0PVc1obGctPq6RrTIDjA04TgqKmmbkAQ8Onp8VgGA5GHcSftg8eIw5MDGfnI547YcWPVO00LbvNWzCF";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;
const Text = styled.div`
  font-weight: bold;
  margin: 5px auto;
`;
const ButtonDelete = styled.button`
  font-weight: bold;
  /* margin: 5px auto; */
  border: 1px solid black;
  width: 200px;
  height: 30px;
  cursor: pointer;
  margin: auto 10px;
  background-color: black;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
`;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  // console.log(user.currentUser);
  const dispatch = useDispatch();
  const [stripeToken, setTripeToken] = useState(null);

  let navigate = useNavigate();

  const onToken = (token) => {
    setTripeToken(token);
  };
  // console.log(stripeToken);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (error) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleContinue = () => {
    navigate("/products");
  };
  const handleLoggin = () => {
    navigate("/login");
  };
  const handleDelete = (product) => {
    // console.log(product.quantity);
    // console.log(product.price);
    // console.log(product)
    // cart.products.filter((e) => e !== product);
    dispatch(
      deleteProduct({
        id: product._id,
        quantity: product.quantity,
        price: product.price,
      })
    );
    // navigate("/cart")
  };
  // console.log(cart.products);
  const handleCheckInfo = (e)=>{
    navigate("/profile")
  }
  const handleCheckOut = async (e) => {
    e.preventDefault();
    const { data } =  cart;
    let id = { userId: user.currentUser._id,
                name: user.currentUser.name,
                number: user.currentUser.number,
                address: user.currentUser.address,
                email: user.currentUser.email
    };
    // console.log(cart, user.currentUser._id, user.currentUser.name);
    let obj = {}
    obj ={...id,...cart}
    console.log(obj)
    try {
      const res = await axios.post("https://carappreactjs.herokuapp.com/api/order", {
        ...id,
        ...cart,
      });

      console.log(res);
      // navigate("/login");
    } catch (error) {
      console.log(error);
      // setError(true)
    }
    navigate("/")
    alert("Order successfully, please check email to confirm your order !!!")
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={handleContinue}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <>
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b>
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {/* <Add onClick={() => handleClick("add")} /> */}
                      <ProductAmount>Quatity: {product.quantity}</ProductAmount>
                      {/* <Remove onClick={() => handleClick("remove")} /> */}
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.quantity * product.price}
                    </ProductPrice>
                  </PriceDetail>
                  <ButtonDelete onClick={() => handleDelete(product)}>
                    Delete
                  </ButtonDelete>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {user.currentUser ? (
              // <StripeCheckout
              //   name="Storing"
              //   image="https://cdn.pixabay.com/photo/2020/11/25/14/14/cat-5775895_960_720.jpg"
              //   billingAddress
              //   shippingAddress
              //   description={`Your total is $${cart.total}`}
              //   amount={cart.total * 100}
              //   token={onToken}
              //   stripeKey={KEY}
              // >
              <>
              <Button onClick={handleCheckOut}>CHECKOUT NOW</Button>
              <Button onClick={handleCheckInfo}>CHECK INFO</Button>
              </>
            ) : (
              // </StripeCheckout>
              <>
                <Text>You need to sign in to check out</Text>
                <Button onClick={handleLoggin}>Sign in</Button>
              </>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
