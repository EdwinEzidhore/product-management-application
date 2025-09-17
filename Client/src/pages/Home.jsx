import { useEffect, useState } from "react";
import ActionsBar from "../components/ActionsBar";
import Nav from "../components/Nav";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import axios from "axios";
import { base_url } from "../config/base_url";
const Home = () => {


  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${base_url}/api/products/get-products`).then((res) => {
        // console.log(res.data.products);
        setProducts(res.data.products)
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Nav />
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <SideBar />
        </div>
        <div className="col-span-9">
          <div className="p-5">
            <div>
              <ActionsBar />
            </div>
            <div className="p-5 mt-4">
              <ProductList products={ products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
