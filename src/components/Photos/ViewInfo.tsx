import React, { useState } from "react";
import API from "../../services/api";
import "../../../public/css/ViewPhoto.css";
import { AxiosError } from "axios";
import { Photo } from "../../types/photos";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface PhotoViewFormProps {
  apiRoute: string;
}

const PhotoViewForm: React.FC<PhotoViewFormProps> = ({ apiRoute }) => {
  const [id, setId] = useState("");
  const [photoInfo, setPhotoInfo] = useState<Photo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleViewPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPhotoInfo(null);

    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await API.get(`${apiRoute.replace(":id", id)}`, {
        headers,
      });

      if (response.status === 404) {
        setError("Photo Not Found");
      } else {
        setPhotoInfo(response.data);
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

      {photoInfo && !error && (
        <div className="photo-info">
          <h3>Photo Details</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{photoInfo.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{photoInfo.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{photoInfo.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3000/uploads/${photoInfo.filename}`}
                    alt={photoInfo.title}
                    width="150"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell>
                  {photoInfo.categories.map((category, index) => (
                    <span key={category.id}>
                      {index + 1}- {category.name}
                      {index < photoInfo.categories.length - 1 && ", "}
                    </span>
                  ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Uploaded By</TableCell>
                <TableCell>{photoInfo.uploadedBy.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{photoInfo.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PhotoViewForm;
