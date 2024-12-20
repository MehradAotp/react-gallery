import React, { useEffect, useState } from "react";
import "../../../public/css/PendingPhotos.css";
import API from "../../services/api";
import { AxiosError } from "axios";

interface Category {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  username: string;
}

enum StatusEnum {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

interface PhotoPending {
  id: string;
  filename: string;
  title: string;
  categories: Category[];
  description?: string;
  status: StatusEnum;
  uploadedBy: User;
}

const PendingPhotos: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoPending[]>([]); 
  const [error, setError] = useState<string>(""); 

  
  useEffect(() => {
    const fetchPendingPhotos = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await API.get<PhotoPending[]>("/photos/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPhotos(response.data);  
      } catch (err: unknown) {
        console.error("Error fetching pending photos:", err);
        if (err instanceof AxiosError) {
          setError("Failed to fetch pending photos. Please try again.");
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchPendingPhotos();
  }, []);

  return (
    <div className="pending-photos-container">
      <h2>Pending Photos</h2>
      {error && <p className="error">{error}</p>}
      <div className="photos-grid">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              {/* نمایش تصویر */}
              <img
                src={`http://localhost:3000/uploads/${photo.filename}`}
                alt={photo.title}
                className="photo-image"
              />
              {/* اطلاعات عکس */}
              <div className="photo-info">
                <h3>{photo.title}</h3>
                <p>
                  <strong>ID:</strong> {photo.id} 
                </p>
                <p>
                  <strong>Uploaded By:</strong> {photo.uploadedBy.username}
                </p>
                <p>
                  <strong>Categories:</strong>{" "}
                  {photo.categories.map((cat) => cat.name).join(", ")}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {photo.description || "No description provided"}
                </p>
                <p>
                  <strong>Status:</strong> {photo.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No pending photos found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingPhotos;
