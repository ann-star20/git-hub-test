import React, { useState, useEffect } from 'react';
import './Post.css';

function Post({ data }) {
  // 처음에는 App.js에서 준 기본 경로(jpg)로 시작
  const [imgSrc, setImgSrc] = useState(data.feedImg);
  const [retryCount, setRetryCount] = useState(0);

  // 에러 발생 시 실행되는 함수
  const handleImgError = () => {
    if (retryCount === 0) {
      // 1차 시도: .jpg -> .png로 변경
      setImgSrc(data.feedImg.replace('.jpg', '.png'));
      setRetryCount(1);
    } else if (retryCount === 1) {
      // 2차 시도: .png -> .jpeg로 변경
      setImgSrc(data.feedImg.replace('.jpg', '.jpeg'));
      setRetryCount(2);
    } else {
      // 모두 실패 시: 빈 이미지나 기본 샘플 이미지 출력
      setImgSrc('https://via.placeholder.com/400x400?text=No+Image');
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={data.profileImg} className="profile-img" alt="profile" />
        <span className="username">{data.username}</span>
      </div>
      
      <img 
        src={imgSrc} 
        className="feed-img" 
        onError={handleImgError} // 👈 여기서 확장자를 바꿔치기함
        alt="feed content" 
      />
      
      <div className="post-footer">
        <span className="likes">좋아요 {data.likes.toLocaleString()}개</span>
        <div className="post-content">
          <span className="content-username">{data.username}</span>
          {data.content}
        </div>
      </div>
    </div>
  );
}

export default Post;