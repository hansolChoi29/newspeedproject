// export default function useImageHandling(maxImages = 3) {
//   const onImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + previewUrls.length > maxImages) {
//       alert(`최대 ${maxImages}개의 이미지만 선택할 수 있습니다.`);
//       return;
//     }

//     const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
//     setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
//     setPostImages((prevImages) => [...prevImages, ...files]);
//   };

//   const handleDeleteImage = (index) => {
//     const newPreviewUrls = [...previewUrls];
//     newPreviewUrls.splice(index, 1);
//     setPreviewUrls(newPreviewUrls);

//     const newPostImages = [...postImages];
//     newPostImages.splice(index, 1);
//     setPostImages(newPostImages);
//   };

//   useEffect(() => {
//     return () => {
//       previewUrls.forEach(URL.revokeObjectURL);
//     };
//   }, [previewUrls]);

//   return { postImages, setPostImages, previewUrls, setPreviewUrls, onImageChange, handleDeleteImage };
// }
