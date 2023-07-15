import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrand } from "../../features/filter/filterSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const filter = useSelector((state) => state.filter);
  const { stock, brands } = filter;
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.data));
  // });

  const { data, isLoading, isError } = useGetProductsQuery();

  const products = data?.data;

  // * filter and toggle section
  let content;

  if (isLoading) {
    content = <h1>LOADING.........</h1>;
  }
  if (isError) {
    content = <h1>Some thing Went Wrong</h1>;
  }

  if (products?.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }

  if (products?.length && (stock || brands?.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands?.length) {
          return brands.includes(product.brand);
        }
        return products;
      })
      .map((product) => <ProductCard key={product.model} product={product} />);
  }
  // * for Toggle buttons
  const activeClass = "text-white  bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          }  `}>
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrand("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          }`}>
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrand("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;
