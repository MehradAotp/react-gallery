import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import API from "../../services/api";
import { Photo } from "../../types/photos";

const MyPhoto: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = localStorage.getItem("token");
        let response;
        if (token) {
          response = await API.get<Photo[]>('/photos/my-photos', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          return <h1>Please LogIn</h1>;
        }
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPhotos();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Thumbnail</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Uploaded By</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {photos.map((photo) => (
            <TableRow key={photo.id}>
              <TableCell>{photo.id}</TableCell>
              <TableCell>{photo.title}</TableCell>
              <TableCell>{photo.description}</TableCell>
              <TableCell>
              <img
                src={`http://localhost:3000/uploads/${photo.filename}`}
                alt={photo.title}
                width="150"
              />
              </TableCell>
              <TableCell>
                  {photo.categories.map((category, index) => (
                    <span key={category.id}>
                      {index + 1}- {category.name} 
                      {index < photo.categories.length - 1 && ", "}
                    </span>
                  ))}
              </TableCell>
              <TableCell>{photo.uploadedBy.username}</TableCell>
              <TableCell>{photo.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyPhoto;
