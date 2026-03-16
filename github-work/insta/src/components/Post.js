// src/components/Post.js
import React from 'react';

const Post = ({ data }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={data.profileImg} alt="profile" className="profile-img" />
        <span className="username">{data.username}</span>
      </div>
      <img src={data.feedImg} alt="feed" className="feed-img" />
      <div className="post-content">
        <p><strong>{data.username}</strong> {data.content}</p>
        <p className="likes">좋아요 {data.likes}개</p>
      </div>
    </div>
  );
};

export default Post;