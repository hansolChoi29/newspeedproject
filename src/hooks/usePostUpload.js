// import { supabase } from '../supabase/supabase';

// export default function usePostUpload(user, contents, postImages, previewUrls, isEditMode, postId) {
//   const onUpload = async (e) => {
//     e.preventDefault();

//     if (!contents.trim() && postImages.length === 0) {
//       alert('내용을 입력하거나 이미지를 선택해주세요.');
//       return;
//     }

//     try {
//       const imgUrls = await Promise.all(postImages.map(uploadImage));

//       const postData = {
//         post_contents: contents,
//         post_imgs: [...previewUrls.filter((url) => url.startsWith('http')), ...imgUrls],
//         user_id: user.id
//       };

//       let result;

//       if (isEditMode) {
//         result = await supabase.from('posts').update(postData).eq('id', postId);
//       } else {
//         result = await supabase.from('posts').insert(postData);
//       }

//       const { error } = result;
//       if (error) throw error;

//       alert('게시물이 성공적으로 업로드되었습니다.');
//       navigate('/home');
//     } catch (error) {
//       console.error('게시물 업로드 오류 : ', error);
//       alert(`게시물 업로드를 실패했습니다: ${error.message}`);
//     }
//   };

//   return { onUpload };
// }
