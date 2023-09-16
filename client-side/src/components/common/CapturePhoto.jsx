import React, { useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'

const CapturePhoto = ({ setImage, hide }) => {

  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      console.log("x");
      stream = await navigator.mediaDevices.getUserMedia({
        video: true, audio: false
      });
      videoRef.current.srcObject = stream;
    };
    startCamera();
    return () => {
      console.log("ello");
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [])

  const capturePhoto = () => {
    const canvas = document.createElement("canvas")
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 300, 150);
    const url = canvas.toDataURL("image/jpeg");
    setImage(url);
    hide(false);
  }

  return (
    <div className='fixed h-5/6 w-2/6 top-14 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex justify-center items-center'>
      <div className='flex flex-col gap-4 w-full items-center justify-center'>
        <div className='pt-2 pr-2 cursor-pointer flex item-end justify-end' onClick={() => { hide(false) }}>
          <IoClose className='h-10 w-10 cursor-pointer' />
        </div>
        <div className='flex justify-center'>
          <video id="video" width="400" autoPlay ref={videoRef}></video>

        </div>
        <button className='h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-300 p-2 mb-20' onClick={capturePhoto}>

        </button>
      </div>
    </div>
  )
}

export default CapturePhoto
