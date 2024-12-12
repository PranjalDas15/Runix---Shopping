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
import { useProductContext } from "./productContext";

interface UserData {
  _id: string,
  email: string | undefined | null,
  phone: number | undefined | null,
  address: [string | undefined | null]
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
  signup: (email: string, password: string, phone: string) => void;
  signout: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
  addToWishlist: (product: any) => void;
  refreshWishlist: () => void;
  deleteFromWishlist: (product: any) => void;
  addToCart: (user: any, product: any) => void;
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
  const [wishlist, setWishlist] = useState<WishlistData | any>(null);
  const [ isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)
  const [loading, setLoading] = useState<boolean>(true);
  const { products } = useProductContext()
  const router = useRouter();


  const signup = async(email: string, phone: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/signup',{email, phone, password});
      if(!res.data) {
        console.log(res?.data?.error);
      }
      const data = res.data;
      console.log(data)
    } catch (error:any) {
      return console.error(error?.data)
    }
  }

  {/* User Context starts */}


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



  useEffect(()=>{
   const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/user/customer/details', {withCredentials: true})
      const data = await res.data?.user;
      if(!data) {
        console.log(data.error);
      }
      console.log('User: ',data)
      setCurrentUser(data);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      setIsLoggedIn(false)
      setLoading(false);
      console.error("Error", error)
    } 
   }
    fetchUser();
  }, [])




  {/* User Context ends */}




  {/* Wishlist Context */}

  const refreshWishlist = async () => {
    try {
      const res = await axios.get('/api/user/customer/wishlist', {
        withCredentials: true,
      });
      if (res.status === 200) {
        setWishlist(res.data.wishlist);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const addToWishlist = async (product: any)=>{
      if (!product) {
        toast.error("Product information is missing!");
        return;
      }
      try {
        const response = await axios.post<WishlistResponse>('/api/user/customer/wishlist', {
          products: [product]
        }, {withCredentials: true});
        if (response.data?.wishlist) {
          setWishlist((prevWishlist: any)=> ({
            ...prevWishlist,
            products: [...(prevWishlist.products || []), product]
          }));
          await refreshWishlist();
          toast.success("Product added to wishlist!");
        }      
      }
      catch (error: any) {
        toast.error("Already added to list.");
      }

    }

    const deleteFromWishlist = async(product: any)=>{
      if(!product) return toast.error("Product Information is missing.");

      try {
        const response = await axios.delete<WishlistResponse>('/api/user/customer/wishlist', 
          { data: { products: [product] }, withCredentials: true });
        console.log(response)
        if(response.data?.wishlist){
          setWishlist((prevWishlist:any) => ({
            ...prevWishlist,
            products: prevWishlist.products.filter((p: any)=> p !==product)
          }));
          await refreshWishlist();
          toast.success("Product removed from wishlist!");
        }
      } catch (error:any) {
        toast.error(error.data.message)
      }
    }


    useEffect(()=> {

      const getWishlist = async() => {
        try {
          setLoading(true);
          const res = await axios.get('/api/user/customer/wishlist', {withCredentials: true})
          if(res.status === 200) {
            const data = res.data.wishlist;
            setWishlist(data);
          } else {
            console.error(res.data.message);
          }
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
      
      getWishlist();
    }, [])




  
  {/* Wishlist Context  ends*/}


  {/* Cart Context */}
    
  const addToCart = async (user: any ,product: any)=>{
    if (!user || !product) {
      toast.error("User or Product information is missing!");
      return;
    }
    try {
      const response = await axios.post<CartResponse>('/api/cart', {
        user: user,
        products: [product]
      })
      if (response.data?.cart) {
        toast.success("Product added to cart!");
      }
      return response.data;        
    }
    catch (error: any) {
      toast.error(error.response.data.message);
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
    refreshWishlist,
    addToCart,
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
