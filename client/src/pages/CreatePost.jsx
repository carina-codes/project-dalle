import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form actions
  const generateImage = async () => {
    if(form.prompt) {
      try {
        // Get the response from the backend
        setGeneratingImg(true);
        const response = await fetch('https://dall-e-ehuv.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json(); 

        // Get and save the photo
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);
      
      try {
        const response = await fetch('https://dall-e-ehuv.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt})
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="header">
              <h1>
                Create
              </h1>
              <p>
                Create imaginative and visually stunning images through DALL-E AI and share them with the community.
              </p>
            </div>

            <form className="form-style" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-5">
                  <div className="create-fields">
                    <FormField 
                      labelName="Your name"
                      type="text"
                      name="name"
                      placeholder="John Doe" 
                      value={form.name}
                      handleChange={handleChange}
                    />
                    <FormField 
                      labelName="Prompt"
                      type="text"
                      name="prompt"
                      placeholder="A plush toy robot sitting against a yellow wall" 
                      value={form.prompt}
                      handleChange={handleChange} 
                      isSurpriseMe 
                      handleSurpriseMe={handleSurpriseMe}
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="ai-image">
                    {form.photo ? (
                      <img 
                        src={form.photo}
                        alt={form.prompt}
                        className="generated-img"
                      />
                    ) : (
                      <img 
                        src={preview}
                        alt="preview"
                        className="generated-img-preview"
                      />
                    )}

                    {generatingImg && (
                      <div className="loading-img jalign">
                        <Loader />
                      </div>
                    )}
                  </div>

                  <div className="align-center">
                    <button
                      type="button"
                      onClick={generateImage}
                      className="btn-generate"
                    >
                      {generatingImg ? 'Generating...' : 'Generate'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="share-generated-image">
                <p>
                  Once you have created the image you want, you can share it with others in the community.
                </p>
                <button
                  type="submit"
                  className="btn-share"
                >
                  {loading ? 'Sharing...' : 'Share with the community'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatePost