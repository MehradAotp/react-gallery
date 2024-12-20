import React, { useState } from "react"
import API from "../../services/api";
import "../../../public/css/Category.css";
import { AxiosError } from "axios";

interface DeleteCategoryFormProps{
    onDeleteSuccess : () => void
}

const DeleteCategoryForm : React.FC<DeleteCategoryFormProps> = ({onDeleteSuccess}) => {
    const [id , setId] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleDeleteCategory = async (e : React.FormEvent) =>{
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
            const response = await API.delete(`/category/${id}` ,{
                headers : {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("Server response:", response.data);
            setSuccess("Delete Category successful!");
            onDeleteSuccess();
        } catch (err: unknown) {
          console.error("Deleting error:", err);
          if (err instanceof AxiosError) {
            setError("Failed to Delete Category. Please try again.");
          } else {
            setError("An unexpected error occurred.");
          }
        }
    };

    return (
        <div className="category-container">
          <form className="category-form" onSubmit={handleDeleteCategory}>
            <h2>Update Category</h2>
            <div className="input-group">
              <label>ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="DeleteCategory-button">Update</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      );
   
}
export default DeleteCategoryForm;