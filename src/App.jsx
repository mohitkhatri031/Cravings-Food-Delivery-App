import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyComponent from './MyComponent'


function App() {

const [search,setSearch] = useState("");
const [selectedCategory,setSelectedCategory] = useState("All");
const [cart,setCart] = useState([]);
const [showCart,setShowCart] = useState(false);

/* FOOD ITEMS */

const foodItems = [

{
id:1,
name:"Margherita Pizza",
price:249,
category:"Pizza",
rating:4.5,
popular:true,
img:"https://safrescobaldistatic.blob.core.windows.net/media/2022/11/PIZZA-MARGHERITA.jpg"
},

{
id:2,
name:"Veg Burger",
price:149,
category:"Burger",
rating:4.2,
img:"https://images.unsplash.com/photo-1550547660-d9450f859349"
},

{
id:3,
name:"Pasta Alfredo",
price:199,
category:"Pasta",
rating:4.4,
img:"https://s3.amazonaws.com/static.realcaliforniamilk.com/media/recipes_2/fettuccine-alfredo-with-creme-fraiche.jpg"
},

{
id:4,
name:"Chocolate Shake",
price:129,
category:"Drinks",
rating:4.1,
img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699"
},

{
id:5,
name:"Veg Biryani",
price:299,
category:"Indian",
rating:4.7,
popular:true,
img:"https://www.cookingcarnival.com/wp-content/uploads/2025/09/Vegetable-Dum-Biryani-5.jpg"
},

{
id:6,
name:"French Fries",
price:99,
category:"Snacks",
rating:4.0,
img:"https://images.unsplash.com/photo-1576107232684-1279f390859f"
},

{
id:7,
name:"Cheese Pizza",
price:279,
category:"Pizza",
rating:4.6,
img:"https://images.unsplash.com/photo-1604382354936-07c5d9983bd3"
},

{
id:8,
name:"Chicken Burger",
price:199,
category:"Burger",
rating:4.5,
popular:true,
img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
},

{
id:9,
name:"Cold Coffee",
price:119,
category:"Drinks",
rating:4.3,
img:"https://images.unsplash.com/photo-1517705008128-361805f42e86"
},

{
id:10,
name:"Paneer Tikka",
price:249,
category:"Indian",
rating:4.6,
img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
}

];

/* CATEGORIES */

const categories = ["All","Pizza","Burger","Pasta","Drinks","Indian","Snacks"];

const icons = {
All:"🍽️",
Pizza:"🍕",
Burger:"🍔",
Pasta:"🍝",
Drinks:"🥤",
Indian:"🍛",
Snacks:"🍟"
};

/* FILTER ITEMS */

const filteredItems = foodItems.filter(
(item)=>
(selectedCategory==="All" || item.category===selectedCategory)
&& item.name.toLowerCase().includes(search.toLowerCase())
);

/* ADD TO CART */

const addToCart = (item)=>{

const exist = cart.find(i=>i.id===item.id);

if(exist){

setCart(
cart.map(i=>
i.id===item.id ? {...i,qty:i.qty+1} : i
)
);

}else{

setCart([...cart,{...item,qty:1}]);

}

};

/* INCREASE QTY */

const increaseQty = (id)=>{
setCart(
cart.map(item=>
item.id===id ? {...item,qty:item.qty+1} : item
)
);
};

/* DECREASE QTY */

const decreaseQty = (id)=>{

setCart(
cart
.map(item=>
item.id===id ? {...item,qty:item.qty-1} : item
)
.filter(item=>item.qty>0)
);

};

/* REMOVE ITEM */

const removeItem = (id)=>{
setCart(cart.filter(item=>item.id!==id));
};

/* TOTAL PRICE */

const total = cart.reduce(
(sum,item)=>sum + item.price * item.qty ,0
);

return (

<div className="app">

{/* NAVBAR */}

<header className="navbar">

<div className="container nav-inner">

<h2 className="logo">🍔 Craving</h2>

<input
type="text"
placeholder="Search for dishes..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="search-input"
/>

<button
className="cart-btn"
onClick={()=>setShowCart(!showCart)}
>
🛒 Cart ({cart.length})
</button>

</div>

</header>


{/* HERO */}

<section className="hero">

<div className="hero-content">

<h1>Order Food Anytime, Anywhere</h1>

<p>Fresh meals delivered to your doorstep.</p>

</div>

</section>


{/* CATEGORY FILTER */}

<section className="container categories">

{categories.map((cat,index)=>(
<button
key={index}
className={selectedCategory===cat ? "active" : ""}
onClick={()=>setSelectedCategory(cat)}
>
<span>{icons[cat]}</span>
{cat}
</button>
))}

</section>


{/* FOOD GRID */}

<section className="container food-grid">

{filteredItems.map((item)=>{

const cartItem = cart.find(i=>i.id===item.id);

return(

<div className="card" key={item.id}>

<div className="img-wrapper">

<img src={item.img} alt={item.name}/>

{item.popular && <span className="popular">Popular</span>}

</div>

<div className="card-body">

<h3>{item.name}</h3>

<p className="rating">⭐ {item.rating}</p>

<div className="price-row">

<span>₹{item.price}</span>

{cartItem ? (

<div className="qty">

<button onClick={()=>decreaseQty(item.id)}>-</button>

<span>{cartItem.qty}</span>

<button onClick={()=>increaseQty(item.id)}>+</button>

</div>

) : (

<button onClick={()=>addToCart(item)}>
Add
</button>

)}

</div>

</div>

</div>

)

})}

</section>


{/* CART PANEL */}

{showCart && (

<div className="cart-panel">

<h3>Your Cart</h3>

{cart.length===0 && <p>No items added</p>}

{cart.map(item=>(

<div key={item.id} className="cart-item">

<div>

<h4>{item.name}</h4>

<p>₹{item.price} × {item.qty}</p>

</div>

<button onClick={()=>removeItem(item.id)}>
Remove
</button>

</div>

))}

<h3>Total: ₹{total}</h3>

<button className="checkout">
Checkout
</button>

</div>

)}

</div>

);

}

export default App;