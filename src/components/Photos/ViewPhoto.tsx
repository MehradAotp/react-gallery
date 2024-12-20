import React, { useState } from "react";
import API from "../../services/api";
import "../../../public/css/ViewPhoto.css";
import { AxiosError } from "axios";

interface PhotoViewFormProps {
  apiRoute: string;
}

const PhotoViewForm: React.FC<PhotoViewFormProps> = ({ apiRoute }) => {
  const [id, setId] = useState(""); 
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); 
  const [error, setError] = useState<string | null>(null); 

  const handleViewPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPhotoUrl(null);

    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await API.get(`${apiRoute.replace(":id", id)}`, {
        headers,
        responseType: "blob", 
      });

      // Checking for the existence of a photo
      if (response.status === 404) {
        setError("Photo Not Found");
      } else if (response.data) {
        const imageUrl = URL.createObjectURL(response.data); // ایجاد URL موقت برای نمایش عکس
        setPhotoUrl(imageUrl);
      }
    } catch (err: unknown) {
      console.error("Error fetching photo:", err);
      
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          setError("Photo Not Found");
        } else {
          setError("Failed to fetch photo. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="photo-container">
      <form className="photo-form" onSubmit={handleViewPhoto}>
        <h2>View Photo</h2>
        <div className="input-group">
          <label>ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="view-photo-button">View</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {photoUrl && (
        <div className="photo-display">
          <img src={photoUrl} alt="Photo" />
        </div>
      )}
    </div>
  );
};

export default PhotoViewForm;
