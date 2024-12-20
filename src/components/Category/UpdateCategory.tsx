import React, { useState } from "react"
import "../../../public/css/Category.css";
import API from "../../services/api";
import { AxiosError } from "axios";

interface UpdateCategoryFormProps{
    onUpdateSuccess : () => void
}

const UpdateCategoryForm : React.FC<UpdateCategoryFormProps> = ({onUpdateSuccess}) => {
    const [name , setName] = useState("");
    const [id , setId] = useState("");
    const [description , setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleUpdateCategory = async (e : React.FormEvent) =>{
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
            const response = await API.patch(`/category/${id}`, {name, description } ,{
                headers : {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("Server response:", response.data);
            setSuccess("Updated Category successful!");
            setName("");
            setDescription("");
            onUpdateSuccess();
        } catch (err: unknown) {
          console.error("Updating error:", err);
          if (err instanceof AxiosError) {
            setError("Failed to Update Category. Please try again.");
          } else {
            setError("An unexpected error occurred.");
          }
        }
    };

    return (
        <div className="category-container">
          <form className="category-form" onSubmit={handleUpdateCategory}>
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
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="UpdateCategory-button">Update</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      );
   
}
export default UpdateCategoryForm;