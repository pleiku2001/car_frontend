import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
const Container = styled.div`


`;
const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 20px;
`;
const Lists = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* width: 100%; */

`;
const List = styled.div`
  /* width: 100px; */
`;

function Products({ category, sort, filter }) {
  // console.log(sort)
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `https://carappreactjs.herokuapp.com/api/products?category=${category}`
            : "https://carappreactjs.herokuapp.com/api/products"
        );
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    try {
      category &&
        setFilterProduct(
          products.filter((item) =>
            Object.entries(filter).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        );
    } catch (error) {}
  }, [products, category, filter]);
  useEffect(() => {
    if (sort === "newest") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      <Text>POPULAR CAR</Text>
      <Lists>
        {category
          ? filterProduct.map((item) => (
              <List key={item._id}>
                <Product item={item} />
              </List>
            ))
          : products.map((item) => (
              <List key={item._id}>
                <Product item={item} />
              </List>
            ))}
      </Lists>
    </Container>
  );
}

export default Products;
