import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Grid, Typography, Card, CardContent, CardMedia, Pagination, CircularProgress, Backdrop } from '@mui/material';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [s3Images, setS3Images] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast.error('Please select an image to upload');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:7005/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();

      if (result.data?.url) {
        toast.success('Image uploaded successfully!');
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        toast.error('Upload failed!');
      }
    } catch (error) {
      toast.error('Upload error!');
    } finally {
      setUploading(false);
    }
  };

  const fetchS3Images = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:7005/api/images');
      const result = await response.json();
      if (result.length > 0) {
        setS3Images(result);
      } else {
        toast.info('No images found in S3');
      }
    } catch (error) {
      toast.error('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = s3Images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: '#f4f4f4' }}>
      <Backdrop open={uploading || loading} sx={{ zIndex: 2 }}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={3}>
        <Card sx={{ maxWidth: 350, p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Image Vault
            </Typography>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {imagePreview && (
              <Box display="flex" justifyContent="center" mt={2}>
                <img src={imagePreview} alt="Preview" height="200" style={{ borderRadius: '8px', opacity: uploading ? 0.5 : 1 }} />
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="contained" color="success" sx={{ width: '48%' }} onClick={handleUpload} disabled={uploading}>
                Upload
              </Button>
              <Button variant="outlined" color="primary" sx={{ width: '48%' }} onClick={fetchS3Images} disabled={loading}>
                View
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 500, p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Images from S3
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {currentImages.length > 0 ? (
                currentImages.map((image) => (
                  <Grid item key={image.filename} xs={6} sm={4} md={3}>
                    <Card sx={{ maxWidth: 120, boxShadow: 3, p: 1 }}>
                      <CardMedia
                        component="img"
                        image={image.url}
                        alt={image.filename}
                        sx={{ borderRadius: '8px', width: '100%', height: '100px', objectFit: 'cover' }}
                      />
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" align="center" color="textSecondary">
                    No images available
                  </Typography>
                </Grid>
              )}
            </Grid>

            {s3Images.length > imagesPerPage && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={Math.ceil(s3Images.length / imagesPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ImageUploader;
