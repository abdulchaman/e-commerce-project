import React,{useState, useEffect} from "react";
import {commerce} from "./lib/commerce";

import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";

const App = ()=>{
    const [products,setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async()=>{
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async()=>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async(productId, quantity)=>{
        setCart(await commerce.cart.add(productId, quantity));
    }

    const handleUpdateCartQty = async(productId, quantity)=>{
        setCart(await commerce.cart.update(productId, { quantity }));
    }

    const handleRemoveFromCart = async(productId)=>{
        setCart(await commerce.cart.remove(productId));
    }

    const handleEmptyCart = async()=>{
        setCart(await commerce.cart.empty());
    }
    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[]);
    console.log(cart);
    return(
        <BrowserRouter>
            <div>
                <Navbar totalItems={cart.total_items}></Navbar>
                <Routes>
                    <Route path="/" element={<Main/>}>
                        <Route index element={<Products products={products} onAddToCart={handleAddToCart}></Products>}/></Route>
                        <Route path="cart" element={ <Cart cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        ></Cart>}></Route>
                        <Route path="checkout" element={<Checkout></Checkout>}></Route>
                    <Route/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App;

