import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes'
import { firebaseAuth } from '@/utils/FirebaseConfig'
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../redux/userSlice'

const login = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const {userInfo,newUser} = useSelector(state=>state.user);

  useEffect(()=>{
    if(userInfo?.id && !newUser) router.push("/");
  },[userInfo,newUser]);
  
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user: { displayName: name, email, photoURL: profileImage } } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log(data);
        if (!data.status) {
          dispatch(Actions.setNewUser(true))
          dispatch(Actions.setUserInfo({ name, email, profileImage }))
          router.push("/onboarding")
        }
        else {
          const { id, name, email, about, profilePicture: profileImage } = data.data;
          dispatch(Actions.setUserInfo({ id, name, email, about, profileImage }))
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className='flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6'>
      <div className='flex justify-center items-center gap-2 text-white'>
        <Image src="/whatsapp.png" alt='whatsapp' width={300} height={300} />
        <span className='text-7xl'>Whatsapp</span>

      </div>
      <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={handleLogin}>
        <FcGoogle className="text-4xl" />
        <span className='text-white text-2xl'>Login with Google</span>
      </button>
    </div>
  )
}

export default login
