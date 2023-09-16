import Avatar from '@/components/common/Avatar'
import Input from '@/components/common/Input'
import { ONBOARD_USER_ROUTE } from '@/utils/ApiRoutes'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from "../redux/userSlice"
import { useRouter } from 'next/router'

const onboarding = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo, newUser } = useSelector(state => state.user)
  console.log(userInfo, newUser)

  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/defaultavatar.png");

  useEffect(()=>{
    if(!newUser && !userInfo?.email) router.push("/login");
    else if(!newUser && userInfo?.email) router.push("/")
  },[newUser,userInfo,router]);

  const onboardUserHandler = async () => {
    if (name.length > 3) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, { email, name, about, image });
        console.log(data);
        if (data.status) {
          dispatch(Actions.setUserInfo({ email, name, about, profileImage:image }))
        }
        router.push("/");

      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className='bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center gap-2 '>
        <Image src='/whatsapp.png' alt='whatsapp' width={240} height={240} />
        <span className='text-7xl'>Whatsapp</span>
      </div>
      <h2 className='text-2xl'>Create Your Profile</h2>
      <div className='flex gap-6 mt-5'>
        <div className='flex flex-col items-center justify-center mt-5 gap-6'>
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className='flex items-center justify-center'>
            <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={onboardUserHandler}>
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>

    </div>
  )
}

export default onboarding