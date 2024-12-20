export interface Category {
  id: string;
  name: string;
}

export interface UploadedBy {
  id: string;
  username: string;
}

export interface Photo {
  id: string;
  filename: string;
  title: string;
  description: string;
  status: string;
  categories: Category[];
  uploadedBy: UploadedBy;
}
