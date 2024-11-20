// export default function usePostUpdate(id) {
//   useEffect(() => {
//     if (id && id !== ':id') {
//       setIsEditMode(true);
//       setPostId(id);
//       loadPostData(id);
//     } else {
//       setIsEditMode(false);
//       setPostId(null);
//     }
//   }, [id]);

//   const loadPostData = async (postId) => {
//     if (!postId || postId === ':id') {
//       console.error('유효하지 않은 게시물 ID:', postId);
//       return;
//     }
//     try {
//       const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();

//       if (error) throw error;

//       return data;
//     } catch (error) {
//       console.error('게시물 로드 오류:', error);
//     }
//   };

//   return { isEditMode, postId, loadPostData };
// }
