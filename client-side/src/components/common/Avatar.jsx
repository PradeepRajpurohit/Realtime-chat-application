import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaCamera } from 'react-icons/fa'
import ContextMenu from './ContextMenu';
import PhotoPicker from './PhotoPicker';
import PhotoLibrary from './PhotoLibrary';
import CapturePhoto from './CapturePhoto';

const Avatar = ({ type, image, setImage }) => {

    const [hover, setHover] = useState(false);
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [grabPhoto, setGrabPhoto] = useState(false);
    const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    const showContextMenu = (e) => {
        e.preventDefault();
        setCoordinates({ x: e.pageX, y: e.pageY });
        setIsContextMenuVisible(true);
    }

    useEffect(()=>{
        if(grabPhoto){
            const data = document.getElementById("photo-picker");
            data.click();
            document.body.onfocus=(e)=>{
                setTimeout(() => {
                    setGrabPhoto("false");
                    
                }, 1000);
            }
        }
    },[grabPhoto]);

    const contextMenuOptions = [
        { name: "Tack Photo", callback: () => { 
            setShowCamera(true);
        } },
        { name: "Choose From Library", callback: () => {
            setShowPhotoLibrary(true);
         } },
        {
            name: "Upload Photo", callback: () => {
                setGrabPhoto(true);
            }
        },
        {
            name: "Remove Photo", callback: () => {
                setImage("/defaultavatar.png")
            }
        }
    ];

    const photoPickerChange = async(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const data = document.createElement("img");
        reader.onload = function(event){
            data.src = event.target.result;
            data.setAttribute("data-src",event.target.result);
        };
        reader.readAsDataURL(file);
        setTimeout(() => {
            setImage(data.src);
        }, 100);

     };
    return (
        <>
            <div className="flex items-center justify-center">
                {type === "sm" && (<div className="relative h-10 w-10">
                    <Image src={image} alt="avatar" className="rounded-full" fill />
                </div>)}
                {type === "lg" && (
                    <div className="relative h-14 w-14">
                        <Image src={image} alt="avatar" className="rounded-full" fill />
                    </div>)}
                {type === "xl" && (
                    <div className="relative cursor-pointer z-0" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 items-center justify-center flex rounded-full flex-col text-center gap-2 ${hover ? "visible" : "hidden"}`} onClick={(e) => showContextMenu(e)} id="context-opener">

                            <FaCamera className="text-2xl" id="context-opener" onClick={(e) => showContextMenu(e)} />
                            <span onClick={(e) => showContextMenu(e)} id="context-opener">Change Profile Photo</span>
                        </div>
                        <div className="h-60 w-60 flex justify-center items-center">
                            <Image src={image} alt="avatar" className="rounded-full " fill />
                        </div>
                    </div>)}
            </div>
            <div>
                {isContextMenuVisible && (<ContextMenu options={contextMenuOptions} coordinates={coordinates} contextMenu={isContextMenuVisible} setContextMenu={setIsContextMenuVisible} />)}
            </div>
            {showCamera && <CapturePhoto setImage={setImage} hide={setShowCamera} />}
            {showPhotoLibrary && <PhotoLibrary setImage={setImage} hideLibrary={setShowPhotoLibrary} />}
            {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}


        </>
    )
}

export default Avatar
