import React, { useEffect, useState } from "react";
import API from "../../services/api";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Photo } from "../../types/photos";
interface PhotoTableProps {
  apiRoute: string; // مسیر API که به کامپوننت ارسال می‌شود
}
const PhotoTable: React.FC<PhotoTableProps> = ({ apiRoute }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = localStorage.getItem("token");
        let response;
        if (token) {
          response = await API.get<Photo[]>(apiRoute, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await API.get<Photo[]>(apiRoute);
        }
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPhotos();
  }, [apiRoute]);

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

export default PhotoTable;
