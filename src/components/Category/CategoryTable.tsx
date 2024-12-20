import React, { useEffect, useState } from "react";
import API from "../../services/api";
import  '../../App.css';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Categories } from "../../types/categories";

const CategoryTable: React.FC = () => {
  const [Category, setPhotos] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
          const response = await API.get<Categories[]>('/category');
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
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
            <TableCell>name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Category.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category._id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
