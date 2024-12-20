import React, { useState } from "react";
import API from "../../services/api";
import "../../../public/css/Category.css";
import { AxiosError } from "axios";

interface CategoryFormProps {
  onCategorySuccess: () => void;
}

const CreateCategoryForm: React.FC<CategoryFormProps> = ({ onCategorySuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        const token = localStorage.getItem("token");
      const response = await API.post("/category", { name, description },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Server response:", response.data);
      setSuccess("Created Category successful!");
      setName("");
      setDescription("");
      onCategorySuccess();
    } catch (err: unknown) {
      console.error("Creation error:", err);
      if (err instanceof AxiosError) {
        setError("Failed to Create Category. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="category-container">
      <form className="category-form" onSubmit={handleCategory}>
        <h2>Create Category</h2>
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
        <button type="submit" className="CreateCategory-button">Create</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default CreateCategoryForm;
