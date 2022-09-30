import React from 'react';
import './PostPage.css'
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import '@firebase/storage';
import { v4 } from "uuid";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';


function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
}

class PostPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     postType: '',
     title: '',
     abstract: '',
     text: '',
     tags: [],
   };
 }

 handleChange = (e) => {
   this.setState({
     [e.target.name]: e.target.value,
   });
 };

 handleSubmit = (e) => {
   e.preventDefault();
   const { postType, title, abstract, text, tags } = this.state;
   const newPost = {
     postType,
     title,
     abstract,
     text,
     tags,
   }; 
   // save newPost to database 
 };






 render() {
   const { postType, title, abstract, text, tags } = this.state;
   return (
     <div>
       <form onSubmit={this.handleSubmit} className='post'>
        <div className='title'>
            <h3>New Post</h3>
        </div>
         <label>
           Select Post Type:
           <select
             name="postType"
             value={postType}
             onChange={this.handleChange}
             className='showOption'
           >
             <option value="">Select</option>
             <option value="question">Question</option>
             <option value="article">Article</option>
           </select>
         </label>
         {postType === 'question' && (
           <div>
            <h3 className='title'>What do you want to ask or share</h3>
              <label className='heading'>
               Title:
               <input
                 type="text"
                 name="title"
                 value={title}
                 onChange={this.handleChange}
                 placeholder='Start your question with how, what, why, etc.'
               />
              </label>
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <button onClick={uploadFile}> Upload Image</button>
              {imageUrls.map((url) => {
                return <img src={url} />;
              })}
             <label className='heading'>
               Describe your problem:
               <textarea
                 name="text"
                 value={text}
                 onChange={this.handleChange}
                 placeholder='I had...'
                 rows='6'
               />
             </label>
             <label className='heading'>
               Tags:
               <input
                 type="text"
                 name="tags"
                 value={tags}
                 onChange={this.handleChange}
                 placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
               />
             </label>
           </div>
         )}
         {postType === 'article' && (
           <div>
               <h3 className='title'>What do you want to ask or share</h3>
             <label className='heading'>
               Title:
               <input
                 type="text"
                 name="title"
                 value={title}
                 onChange={this.handleChange}
                 placeholder='Enter a descriptive title'
               />
             </label>
             <label className='heading'>
               Abstract:
               <textarea
                 name="abstract"
                 value={abstract}
                 onChange={this.handleChange}
                 placeholder='Enter a 1-paragraph abstract'
                 rows='3'
               />
             </label>
             <label className='heading'>
               Article Text:
               <textarea
                 name="text"
                 value={text}
                 onChange={this.handleChange}
                 placeholder='Enter a 1-paragraph abstract'
                 rows='6'
               />
             </label>
             <label className='heading'>
               Tags:
               <input
                 type="text"
                 name="tags"
                 value={tags}
                 onChange={this.handleChange}
                 placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
               />
             </label>
           </div>
         )}
         <input type="submit" value="Post" className='postButton'/>
       </form>
     </div>
   );
 }
}

export default PostPage;