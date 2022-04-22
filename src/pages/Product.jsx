import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { Announcement } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Footer, Navbar, Announcement, Newsletter } from "../components";
import { publicRequest } from "../request";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) => props.color && "solid"};
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const Warning = styled.div`
  font-size: 30px;
  color: red;
`;
const WarningSuccess = styled.div`
  font-size: 30px;
  color: #0417ec;
`;
function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [warn, setWarn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        let res;
        if (id) {
          res = await publicRequest.get("/products/find/" + id);
        } else {
          res = await publicRequest.get("/products");
        }
        setProduct(res.data);
      } catch (error) {}
    };
    getData();
  }, [id]);
  // console.log(product.color);
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (!color || !size) {
      console.log("nhap");
      setWarn(true);
    } else {
      alert("Add success");
      dispatch(addProduct({ ...product, quantity, color, size }));
      // console.log("success")
      setWarn(false);
    }
    setTimeout(() => {
      setWarn(false);
    }, 3000);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterSize onChange={(e) => setColor(e.target.value)}>
                <FilterSizeOption>Color</FilterSizeOption>
                {product.color?.map((s) => (
                  <>
                    <FilterSizeOption color={s} key={s}>
                      {s}
                    </FilterSizeOption>
                  </>
                ))}
              </FilterSize>
            </Filter>

            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption>Size</FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          {warn ? <Warning>Please enter color and size </Warning> : ""}
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Product;
