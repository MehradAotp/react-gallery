import React, { useState } from "react"
import API from "../../services/api";
import "../../../public/css/RejectPhoto.css";
import { AxiosError } from "axios";

interface RejectPhotoFormProps{
    onRejectSuccess : () => void
}

const RejectPhotoForm : React.FC<RejectPhotoFormProps> = ({onRejectSuccess}) => {
    const [id , setId] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleRejectPhoto = async (e : React.FormEvent) =>{
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
            const response = await API.post(`/photos/reject/${id}` ,{},{
                headers : {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("Server response:", response.data);
            setSuccess("Reject Photo successful!");
            onRejectSuccess();
        } catch (err: unknown) {
          console.error("Reject error:", err);
          if (err instanceof AxiosError) {
            setError("Failed to reject Photo. Please try again.");
          } else {
            setError("An unexpected error occurred.");
          }
        }
    };

    return (
        <div className="reject-container">
          <form className="reject-form" onSubmit={handleRejectPhoto}>
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
            <button type="submit" className="reject-button">Reject</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      );
   
}
export default RejectPhotoForm;