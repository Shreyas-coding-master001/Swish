import axios from "axios";
import "./Create.css";
import { useState } from "react";

function Create(){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        visibility: "public",
        coverImage: null,
    });


    const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/community/Create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    alert("Community created successfully!");

    setFormData({
      name: "",
      description: "",
      category: "",
      visibility: "public",
      coverImage: null,
    });

    e.target.reset(); // clears file input


  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to create community");
  }
};


    return( 
    <div className="CreateCommunity">
        <h3>Create Community : </h3>

        <form
          className="community-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Community Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Community Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="tech">Technology</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
          </select>

          <label>Visibility</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit" className="Create-Button">
            Create Community
          </button>
        </form>

    </div> 
    )
}

export default Create;