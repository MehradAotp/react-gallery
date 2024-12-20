import API from "../../services/api";
import React, { useState } from "react";
import "../../../public/css/UploadPhoto.css";
import axios from "axios";

const UploadPhoto: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("categories", categories);
    if (description) {
      formData.append("description", description);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await API.post("photos/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Photo uploaded successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      // تبدیل نوع (casting) برای دسترسی به ویژگی‌های خطا
      if (axios.isAxiosError(error)) {
        console.error("Upload failed:", error.response?.data || error.message);
        setMessage(error.response?.data?.message || "Failed to upload photo. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="upload-photo-container">
      <h2>Upload Photo</h2>
      {message && <p className="upload-message">{message}</p>}
      <div className="upload-form">
        <label htmlFor="fileInput" className="file-label">
          Choose a Photo:
        </label>
        <input type="file" id="fileInput" onChange={handleFileChange} />

        <label htmlFor="titleInput" className="form-label">
          Title:
        </label>
        <input
          type="text"
          id="titleInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="categoriesInput" className="form-label">
          Categories (comma-separated):
        </label>
        <input
          type="text"
          id="categoriesInput"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />

        <label htmlFor="descriptionInput" className="form-label">
          Description (optional):
        </label>
        <textarea
          id="descriptionInput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="upload-button" onClick={handleUpload}>
          Upload Photo
        </button>
      </div>
    </div>
  );
};

export default UploadPhoto;
