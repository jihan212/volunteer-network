import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvents = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageUrl] = useState ();

    const onSubmit = data => {
      const eventData = {
        name: data.name,
        imageURL : imageURL
      }
      const url = `https://shielded-ocean-37663.herokuapp.com/addEvent`;
      
      fetch (url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })
      .then (response => console.log( 'Server side response', response) )
    };

    const handleUploadImage = event =>{
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key','3f4dd576e7ec5e0aa1162eff92b248d7');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
            <h1>Add Your Event</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue="New Event" ref={register} />
                <br/>
                <input name="exampleRequired" type="file" onChange={handleUploadImage} />
                <br/>
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddEvents;