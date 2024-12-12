'use client'

import { useRouter } from 'next/navigation'
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config';
import { useState } from 'react';
import Image from 'next/image';
import { images } from '@/lib/assets';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useUser } from '@/Context/userContext';

const page = () => {
  const router = useRouter();
  const [ isSignIn, setIsSignIn ] = useState<boolean>(true)
  const [ email, setEmail] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ phone, setPhone ] = useState<string>('');
  const [ createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(auth);
  const [ signInWithEmailAndPassword ] = useSignInWithEmailAndPassword(auth);
  const {signin, signup} = useUser();

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      const res2 = await axios.post('/api/users',{
        email
      })

      console.log(res2)

      if(res?.user.refreshToken && res2){
        toast.success("Registered successfully.");
        setIsSignIn(true);
      } else {
        toast.error("User already exists.")
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if(res?.user.refreshToken) {
        setEmail('');
        setPassword('');
        toast.success("Logged in successfully.");
        return router.push('/');
      } else {
        toast.error("Invalid username or password.")
        console.log("Not Authorised");
      }
    } catch (error) {
      console.error(error);
    }
  }
 
  return (
    <div className='min-h-[70vh] w-full bg-white flex justify-center items-center px-10 py-10'>
      { isSignIn ? 
                    <div className='min-w-[70vw] h-[650px] md:h-[400px] flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden'>
                      <div className='h-2/3 md:h-full w-full md:w-2/3 overflow-hidden'>
                        <Image alt='' src={images.hero2} className='w-full h-full object-cover'/>
                      </div>
                      <div className='w-full h-full bg-orange-50 flex flex-col items-center justify-center gap-4'>
                        <h1 className='font-semibold text-2xl py-3'>Login</h1>
                        <div className='w-full flex flex-col items-center justify-center'>
                          <label htmlFor="email" className='block'>Email</label>
                          <input id='email' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full'/>
                        </div>
                        <div className='w-full flex flex-col items-center justify-center'>
                          <label htmlFor="password" className='block'>Password</label>
                          <input id='password' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full'/>
                        </div>
                        <button type='submit' onClick={()=>signin(email, password)} className='w-2/3 md:w-1/2 bg-orange-400 py-2 rounded-full text-lg hover:bg-white border-2 border-orange-400 custom-transition'>Login</button>
                        <p>Not yet Registered? <span onClick={()=>setIsSignIn(!isSignIn)} className='hover:text-orange-400 cursor-pointer underline underline-offset-1'>Register</span></p>
                      </div>
                    </div> 
                  
                  :
                  <div className='min-w-[70vw] h-[650px] md:h-[400px] flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden'>

                  <div className='h-2/3 md:h-full w-full md:w-2/3 overflow-hidden'>
                        <Image alt='' src={images.hero2} className='w-full h-full object-cover'/>
                  </div>
                  <div className='w-full h-full bg-orange-50 flex flex-col items-center justify-center gap-4'>
                    <h1 className='font-semibold text-2xl py-3'>Register</h1>
                    <div className='w-full flex flex-col items-center justify-center'>
                      <label htmlFor="email" className='block'>Email</label>
                      <input id='email' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full'/>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center'>
                      <label htmlFor="phone" className='block'>Phone</label>
                      <input id='phone' type="tel" onChange={(e)=>setPhone(e.target.value)} value={phone} className='w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full'/>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center'>
                      <label htmlFor="password" className='block'>Password</label>
                      <input id='password' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full'/>
                    </div>
                    <button type='submit' onClick={()=>signup(email, phone, password)} className='w-2/3 md:w-1/2 bg-orange-400 py-2 rounded-full text-lg hover:bg-white border-2 border-orange-400 custom-transition'>Register</button>
                    <p>Already Registered? <span onClick={()=>setIsSignIn(!isSignIn)} className='hover:text-orange-400 cursor-pointer underline underline-offset-1'>Login</span></p>
                  </div></div>}
    </div>
  )
}

export default page