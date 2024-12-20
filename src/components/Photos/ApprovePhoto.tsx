import React, { useState } from "react"
import API from "../../services/api";
import "../../../public/css/ApprovePhoto.css";

interface ApprovePhotoFormProps{
    onApproveSuccess : () => void
}

const ApprovePhotoForm : React.FC<ApprovePhotoFormProps> = ({onApproveSuccess}) => {
    const [id , setId] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleApprovePhoto = async (e : React.FormEvent) =>{
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
            const response = await API.post(`/photos/approve/${id}` ,{},{
                headers : {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("Server response:", response.data);
            setSuccess("Approve Photo successful!");
            onApproveSuccess();
        } catch (err) {
            console.error("approve error:", err);
            setError("Failed to Approve Photo. Please try again.");
        }
    };

    return (
        <div className="approve-container">
          <form className="approve-form" onSubmit={handleApprovePhoto}>
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
            <button type="submit" className="approve-button">Update</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      );
   
}
export default ApprovePhotoForm;