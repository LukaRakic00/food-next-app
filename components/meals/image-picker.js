'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'; 

import classes from './image-picker.module.css'

// htmlFor sluzi za  koristi se za povezivanje <label> elementa sa odgovarajućim unosnim (input) elementom u formi, kao što su <input>, <textarea>, <select>, itd.
// accept za kontrolisanje fajla, samo png i jpeg
export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage]  = useState(); // za preview slike
   
    const imageInput = useRef(); 
   
    function handlePickClick() {
        imageInput.current.click(); 
    }
   
    // za preview slike
    function handleImageChange(event) {
        const file = event.target.files[0]; 

        if(!file) {
            setPickedImage(null); 
            return; 
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result); 
        };

        fileReader.readAsDataURL(file); 
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>   
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                    <Image 
                        src={pickedImage} 
                        alt="The image selected by the user."
                        fill
                    />
                )}
                </div>
                <input 
                    className={classes.input}
                    type="file" 
                    id={name}
                    accept="image/png, image/jpeg" 
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                /> 
                <button 
                    className={classes.button} 
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );     
}