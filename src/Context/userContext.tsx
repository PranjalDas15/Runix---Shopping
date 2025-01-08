'use client'

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface UserData {
  _id: string,
  email: string | undefined | null;
  phone: number | undefined | null;
  address: Array<string | null | undefined>;
  role: string;
  cart: Array<{ product: any; quantity: number }>;
  wishlist: Array<{ product: any }>;
}

interface WishlistData {
  user: any,
  products: [any]
}

interface ApiResponse {
  message: string,
  users: UserData[]
}

interface UserContextType {
  loading: boolean;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string, phone: string, role: any) => void;
  signout: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
  addToWishlist: (product: any) => void;
  fetchUser: () => void;
  deleteFromWishlist: (product: any) => void;
  addToCart: (productId: any, productQuantity: any) => void;
  updateCart: (productId: any, productQuantity: any) => void;
  currnetUser: UserData | null | undefined,
  setCurrentUser: React.Dispatch<React.SetStateAction< undefined | any >>
  wishlist: any | null | undefined,
  setWishlist: React.Dispatch<React.SetStateAction< undefined | any >>
}

type WishlistResponse = {
  message: string;
  wishlist?: {
    user: any;
    products: string[];
  };
};

type CartResponse = {
  message: string;
  cart?: {
    user: string;
    products: string[];
  };
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [ currnetUser, setCurrentUser ] = useState<UserData | null>();
  const [ wishlist, setWishlist ] = useState<WishlistData | any>(null);
  const [ isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)
  const [ loading, setLoading ] = useState<boolean>(true);
  const router = useRouter();




  {/* User Context starts */}

  const signup = async(email: string, phone: string, password: string,  role: any) => {
    try {
      const res = await axios.post('/api/auth/signup',{email, phone, password, role});
      const data = res?.data;
      if(!data) {
        console.log(res?.data?.error);
      }
    } catch (error:any) {
      return console.error(error?.data)
    }
  }

  const signin = async (email:string, password:string) => {
    
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/signin', {email, password}, {withCredentials: true});
      if(!res.data) {
        console.log(res?.data?.error);
      }
      router.push('/');
      setIsLoggedIn(true);
      setLoading(false);
      await fetchUser();
      
      toast.success("Logged in successfully");
    } catch (error:any) {
      setLoading(false);
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  }


  const signout = async() => {
    try {
      const res = await axios.post('/api/auth/customerSignout');
      if(!res){
        toast.error('Something went wrong.');
      }
      setCurrentUser(null);
      setWishlist(null);
      setIsLoggedIn(false);
      router.push('/login')

    } catch (error) {
      console.error(error)
    }
  }



   const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/user/customer/details', {withCredentials: true})
      const data = await res.data?.user;
      if(!data) {
        console.log(data.error);
      }
      setCurrentUser(data);
      setWishlist(data.wishlist);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } 
   }
   useEffect(()=> {
    fetchUser();
   }, [])

  {/* User Context ends */}




  {/* Wishlist Context */}


  const addToWishlist = async (productId: any) => {
    if (!productId) {
      toast.error("Product information is missing!");
      return;
    }
  
    try {
      const response = await axios.patch<UserData>(
        '/api/user/customer/wishlist', 
        { productId },
        { withCredentials: true }
      );
  
      if (response.data) {
        setWishlist(response.data.wishlist);
        console.log("Wishlist:", wishlist)
        await fetchUser();
        toast.success('Added to wishlist');
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  

  const deleteFromWishlist = async (productId: string) => {
    if(!productId){
      toast.error("Product information is missing.");
      return;
    }

    try {
      const response = await axios.delete<UserData>(
        '/api/user/customer/wishlist',
        { 
          data: { productId }, 
          withCredentials: true 
        });

      console.log(response.data);
      if(response.data) {
        await fetchUser();
        toast.success('Removed from wishlist.')
      } else {
        toast.error("Something went wrong.")
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  }

  {/* Wishlist Context  ends*/}


  {/* Cart Context */}
    
  const addToCart = async (productId: any, productQuantity: any)=>{
    if (!productId || !productQuantity) {
      toast.error("Information is missing!");
      return;
    }
    try {
      const response = await axios.patch<UserData>('/api/user/customer/cart', {
        productId, productQuantity
      }, {
        withCredentials: true
      })
      if (response.status === 200) {
        await fetchUser()
        toast.success("Product added to cart!");
      }
      return response.data;        
    }
    catch (error: any) {
      toast.error(error.response.data.message);
    }

  }

  const updateCart = async(productId: any, productQuantity: any)=> {

    try {
      const response = await axios.delete<UserData>('/api/user/customer/cart',
        {data: { productId, productQuantity }, withCredentials: true}
      )

      if(response.status === 200) {
        await fetchUser();
      } else {
        toast.error("Error")
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  }


  {/* Cart Context  ends*/}
    

  const userValue = {
    loading,
    signin,
    signup,
    signout,
    setLoading,
    addToWishlist,
    deleteFromWishlist,
    wishlist,
    isLoggedIn,
    setIsLoggedIn,
    setWishlist,
    fetchUser,
    addToCart,
    updateCart,
    currnetUser,
    setCurrentUser
  };


  return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
