import banner1 from "../../public/banner1.jpg";
import hero from "../../public/hero.png";
import hero1 from "../../public/hero1.png";
import hero2 from "../../public/hero2.jpg";
import logo from "../../public/logo.svg";
import logowhite from "../../public/Logotextwhite.svg";
import logofullwhite from "../../public/Logotextfullwhite.svg";
import logoblack from "../../public/logotextblack.svg";
import running from "../../public/running.png";
import sneakerm from "../../public/categories/sneakermen.jpg";
import sneakerw from "../../public/categories/sneakerwomen.jpg";
import tshirtm from "../../public/categories/tshirtmen.jpg";
import tshirtw from "../../public/categories/tshirtwomen.jpg";
import shortsm from "../../public/categories/shortsmen.jpg";
import shortsw from "../../public/categories/shortswomen.jpg";
import tracksm from "../../public/categories/tracksmen.jpg";
import tracksw from "../../public/categories/trackswomen.jpg"; 
import sweatsm from "../../public/categories/sweatsmen.jpg"; 
import sweatsw from "../../public/categories/sweatswomen.jpg"; 
import jacketsm from "../../public/categories/jacketsmen.jpg"; 
import jacketsw from "../../public/categories/jacketswomen.jpg"; 
import accm from "../../public/categories/accessoriesmen.jpg"; 
import accw from "../../public/categories/accessorieswomen.jpg"; 

import sneaker1 from "../../public/products/sneaker1.jpg"
import sneaker2 from "../../public/products/sneaker2.jpg"
import sneaker3 from "../../public/products/sneaker3.jpg"
import sneaker4 from "../../public/products/sneaker4.jpg"
import training1 from "../../public/products/training1.jpg"
import training2 from "../../public/products/training2.jpg"
import training3 from "../../public/products/training3.jpg"
import training4 from "../../public/products/training4.jpg"
import walking1 from "../../public/products/walking1.jpg"
import walking2 from "../../public/products/walking2.jpg"
import walking3 from "../../public/products/walking3.jpg"
import walking4 from "../../public/products/walking4.jpg"
import walking5 from "../../public/products/walking5.jpg"
import cricket1 from "../../public/products/cricket1.jpg"
import cricket2 from "../../public/products/cricket2.jpg"
import cricket3 from "../../public/products/cricket3.jpg"
import cricket4 from "../../public/products/cricket4.jpg"
import cricket5 from "../../public/products/cricket5.jpg"
import basket1 from "../../public/products/basket1.jpg"
import basket2 from "../../public/products/basket2.jpg"
import basket3 from "../../public/products/basket3.jpg"
import basket4 from "../../public/products/basket4.jpg"
import outdoor1 from "../../public/products/outdoor1.jpg"
import outdoor2 from "../../public/products/outdoor2.jpg"
import outdoor3 from "../../public/products/outdoor3.jpg"
import running1 from "../../public/products/running1.jpg"
import running2 from "../../public/products/running2.jpg"
import running3 from "../../public/products/running3.jpg"
import running4 from "../../public/products/running4.jpg"
import ad1 from "../../public/products/ad1.jpg"
import ad2 from "../../public/products/ad2.jpg"
import ad3 from "../../public/products/ad3.jpg"
import ad4 from "../../public/products/ad4.jpg"
import ad5 from "../../public/products/ad5.jpg"
import ad6 from "../../public/products/ad6.jpg"
import ad7 from "../../public/products/ad7.jpg"
import ad8 from "../../public/products/ad8.jpg"
import ad9 from "../../public/products/ad9.jpg"
import ad10 from "../../public/products/ad10.jpg"
import ad11 from "../../public/products/ad11.png"
import enter from "../../public/enter.svg";
import youtube from "../../public/youtube.svg";
import instagram from "../../public/instagram.svg";
import twitter from "../../public/twitter.svg";
import facebook from "../../public/facebook.svg";
import guarantee from "../../public/guarantee.svg";
import returnicon from "../../public/return.svg";
import banner from "../../public/banners/banner1.jpg";
import banner2 from "../../public/banners/banner2.jpg";
import banner3 from "../../public/banners/banner3.jpg";
import banner4 from "../../public/banners/banner4.jpg";
import banner5 from "../../public/banners/banner5.jpg";
import banner6 from "../../public/banners/banner6.jpg";
import banner7 from "../../public/banners/banner7.jpg";
import banner8 from "../../public/banners/banner8.jpg";
import banner9 from "../../public/banners/banner9.jpg";
import banner10 from "../../public/banners/banner10.jpg";

// import  from "../../public/herovid.mp4";

export const images = {
  banner1,
  logo,
  logowhite,
  logofullwhite,
  hero2,
  logoblack, youtube, instagram, twitter, facebook, guarantee, returnicon,
  running, sneakerm, sneakerw, tshirtw, tshirtm, shortsm, shortsw, sweatsm, sweatsw, jacketsm, jacketsw, accm, accw, hero1,
  /* Products */

  sneaker1, sneaker2, sneaker3, sneaker4, training1, training2, training3, training4, walking1, walking2, walking3, walking4, walking5, 
  outdoor1, outdoor2, outdoor3, cricket1, cricket2, cricket3, cricket4, cricket5, basket1, basket2, basket3, basket4, running1, running2, running3, running4,
  ad1, ad2, ad3, ad4, ad5, ad6, ad7, ad8, ad9, ad10, ad11,
  enter, hero,
  banner, banner2, banner3, banner4, banner5, banner6, banner7,banner8, banner9, banner10
};

export const prices = [
  {price: "All", min: 0, max: 10000 },
  {price: "Below 1000" , min: 0, max: 1000 },
  {price: "1000 - 2000", min: 1000, max: 2000 },
  {price: "2000 - 3000", min: 2000, max: 3000 },
  {price: "3000 - 4000", min: 3000, max: 4000 },
  {price: "4000 and above", min:4000, max: 10000 }
]

export const genders = [
  {gender: "Both", value: "" },
  {gender: "Male" ,value: "male"},
  {gender: "Female", value: "female" }
]

export const categories = [
  { type: "All", value: "", image: sneakerm},
  { type: "Shoes", value: "Shoes", image: sneakerm},
  { type: "Topwear" , value: "T-Shirt", image: tshirtm},
  { type: "Bottomwear", value: "Bottomwear", image: shortsm },
  { type: "Sportswear", value: "Sportswear", image: tracksm },
  { type: "Jacket" , value: "Jacket", image: jacketsm},
  { type: "Accessories" , value: "Accessories", image: accm},
  { type: "Winterwear", value: "Winterwear",  image: accm},
];

export const categoriesMale = [
  { type: "Shoes", value:"Shoes", image: sneakerm},
  { type: "Topwear" , value:"T-Shirt", image: tshirtm},
  { type: "BottomWear", value:"Bottomwear", image: shortsm },
  { type: "Sportswear", value:"Sportswear", image: tracksm },
  { type: "Jacket" , value:"Jacket", image: sweatsm},
  { type: "Accessories" , value:"Accessories", image: jacketsm},
  { type: "Winterwear" , value:"Winterwear", image: accm},
];

export const categoriesFemale = [
  { type: "Shoes", value:"Shoes", image: sneakerw},
  { type: "Topwear" , value:"T-Shirt", image: tshirtw},
  { type: "BottomWear", value:"Bottomwear", image: shortsw },
  { type: "Sportswear", value:"Sportswear", image: tracksw },
  { type: "Jacket" , value:"Jacket", image: sweatsw},
  { type: "Accessories" ,value:"Accessories",  image: accw},
  { type: "Winterwear" ,value:"Winterwear",  image: accm},
];


export const customerPolicies = [
  {type: "About Us"},
  {type: "Contact Us"},
  {type: "FAQs"},
  {type: "Terms & Conditions"},
  {type: "Returns"},
]

export const keepInTouch = [
  {name: "www.fecebook.com", logo: facebook},
  {name: "www.x.com", logo: twitter},
  {name: "www.instagram.com", logo: instagram},
  {name: "www.youtube.com", logo: youtube},
]

export const advertise1 = { 
  image: hero1, 
  heading: "New Collection just dropped!",
  body: "Grab them before its gone...",
  button: "Explore"
 }

export const banners = [
  { image: ad1, 
    heading: "Nothing looks cleaner than whites",
    body: "",
    button: "Explore"
   },
   { image: ad2, 
    heading: "Everyone is falling for these sneakers",
    body: "",
    button: "Explore"
   },
   { image: ad3, 
    heading: "Push Your Limits",
    body: "",
    button: "Explore"
   },
   { image: ad4, 
    heading: "Winter Collection is here!",
    body: "",
    button: "Explore"
   },
   { image: ad4, 
    heading: "Winter Collection is here!",
    body: "",
    button: "Explore"
   },
]

export const advertisements = [
  { image: banner, 
    heading: "Nothing looks cleaner than whites",
    body: "",
    button: "Explore"
   },
   { image: banner2, 
    heading: "Everyone is falling for these sneakers",
    body: "",
    button: "Explore"
   },
   { image: banner3, 
    heading: "Push Your Limits",
    body: "",
    button: "Explore"
   },
   { image: banner4, 
    heading: "Winter Collection is here!",
    body: "",
    button: "Explore"
   },
   { image: banner5, 
    heading: "Winter Collection is here!",
    body: "",
    button: "Explore"
   },
]

export const advertisements2 = [
  { image: banner6, 
    heading: "Nothing looks cleaner than whites",
    body: "",
    button: "Explore"
   },
   { image: banner7, 
    heading: "Everyone is falling for these sneakers",
    body: "",
    button: "Explore"
   },
   { image: banner8, 
    heading: "Push 7Your Limits",
    body: "",
    button: "Explore"
   },
   { image: banner9, 
    heading: "Winter Collection is here!",
    body: "",
    button: "Explore"
   },
   { image: banner10, 
    heading: "HEllo",
    body: "",
    button: "Explore"
   }
]

export const commondetails = {
  price: 'Inclusive of all taxes',
  size_heading:'Select Size',
  desc_heading:'Product Description',
  cart_button: 'Add to Cart',
  wishlist_button: 'Add to Wishlist',
  returns: 'Free returns availavle*',
  shippingheading: 'Shipping and Returns',
  shippingdetail1: 'Free return on all qualifying orders within 14 days of your order delivery date. Visit our Return Policy for more information.',
  shippingdetail2: 'For any queries, please contact Customer Service at 0800-000000 or via customercare@runicx.com.'
}

export const products = [
  {
    id: '1',
    image: sneaker1,
    name: 'Sneaker 1',
    desc: 'some descriptions',
    category: 'Sneakers',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '2',
    image: sneaker2,
    name: 'Sneaker 2',
    desc: 'some descriptions',
    category: 'Sneakers',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '3',
    image: sneaker3,
    name: 'Sneaker 3',
    desc: 'some descriptions',
    category: 'Sneakers',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '4',
    image: sneaker4,
    name: 'Sneaker 4',
    desc: 'some descriptions',
    category: 'Sneakers',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '5',
    image: training1,
    name: 'Training 1',
    desc: 'some descriptions',
    category: 'Training',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '6',
    image: training2,
    name: 'Training 2',
    desc: 'some descriptions',
    category: 'Training',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '7',
    image: training3,
    name: 'Training 3',
    desc: 'some descriptions',
    category: 'Training',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '8',
    image: training4,
    name: 'Training 4',
    desc: 'some descriptions',
    category: 'Training',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '9',
    image: walking1,
    name: 'Walking 1',
    desc: 'some descriptions',
    category: 'Walking',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '10',
    image: walking2,
    name: 'Walking 2',
    desc: 'some descriptions',
    category: 'Walking',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '11',
    image: walking3,
    name: 'Walking 3',
    desc: 'some descriptions',
    category: 'Walking',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '12',
    image: walking4,
    name: 'Walking 4',
    desc: 'some descriptions',
    category: 'Walking',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '13',
    image: walking5,
    name: 'Walking 5',
    desc: 'some descriptions',
    category: 'Walking',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '14',
    image: outdoor1,
    name: 'Outdoor 1',
    desc: 'some descriptions',
    category: 'Outdoors',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '15',
    image: outdoor2,
    name: 'Outdoor 2',
    desc: 'some descriptions',
    category: 'Outdoors',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '16',
    image: outdoor3,
    name: 'Outdoor 3',
    desc: 'some descriptions',
    category: 'Outdoors',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '17',
    image: cricket1,
    name: 'Cricket 1',
    desc: 'some descriptions',
    category: 'Cricket',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '18',
    image: cricket2,
    name: 'Cricket 2',
    desc: 'some descriptions',
    category: 'Cricket',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '19',
    image: cricket3,
    name: 'Cricket 3',
    desc: 'some descriptions',
    category: 'Cricket',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '20',
    image: cricket4,
    name: 'Cricket 4',
    desc: 'some descriptions',
    category: 'Cricket',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '21',
    image: cricket5,
    name: 'Cricket 5',
    desc: 'some descriptions',
    category: 'Cricket',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '22',
    image: basket1,
    name: 'Basket 1',
    desc: 'some descriptions',
    category: 'Basketball',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '23',
    image: basket2,
    name: 'Basket 2',
    desc: 'some descriptions',
    category: 'Basketball',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '24',
    image: basket3,
    name: 'Basket 3',
    desc: 'some descriptions',
    category: 'Basketball',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '25',
    image: basket4,
    name: 'Basket 4',
    desc: 'some descriptions',
    category: 'Basketball',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '26',
    image: running1,
    name: 'Running 1',
    desc: 'some descriptions',
    category: 'Running',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '27',
    image: running2,
    name: 'Running 2',
    desc: 'some descriptions',
    category: 'Running',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '28',
    image: running3,
    name: 'Running 3',
    desc: 'some descriptions',
    category: 'Running',
    price: 2300,
    gender: 'Male',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: '29',
    image: running4,
    name: 'Running 4',
    desc: 'some descriptions',
    category: 'Running',
    price: 2300,
    gender: 'Female',
    sizes: [7, 8, 9, 10, 11]
  }
]
