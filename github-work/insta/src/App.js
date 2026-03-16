import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/Post';
import * as XLSX from 'xlsx'; // npm install xlsx 필요

function App() {
  const [feeds, setFeeds] = useState([]); // 엑셀 데이터를 담을 상태

  useEffect(() => {
    // 1. 엑셀 파일 로드 (백엔드 DB 조회와 유사한 과정)
    fetch('../datagold_prices.xlsx') // public 폴더 기준 경로 확인 필요
      .then(res => {
        if (!res.ok) throw new Error('파일을 찾을 수 없습니다.');
          return res.arrayBuffer(); 
        })
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // 2. 엑셀 데이터 + 기존 인스타 UI용 Mock 데이터 결합 (Mapping)
        // 직역: 데이터 변환 / 의역: 로우 데이터를 UI 컴포넌트 규격에 맞게 가공
        const formattedData = rawData.map((item, i) => ({
          id: i + 1,
          username: i % 2 === 0 ? 'gold_miner' : 'rich_investor', // 유저명 랜덤
          profileImg: i % 2 === 0 ? '/images/main.png' : '/images/woman.png',
          // 엑셀에 시세 데이터가 있으니 이미지명은 img01~10 순환 사용
          feedImg: `/images/img${String((i % 10) + 1).padStart(2, '0')}.jpg`,
          content: `오늘의 금 시세 고시날짜: ${item['고시날짜']} | 살 때: ${item['내가살때(순금)']}원`,
          likes: Math.floor(Math.random() * 1000)
        }));

        setFeeds(formattedData);
      })
      .catch(err => console.error("엑셀 로딩 실패:", err));
  }, []);

  return (
    <div className="app">
      <nav className="nav">Gold-Gram (Gold Price Feed)</nav>
      <div className="feed-container">
        {/* 3. 데이터가 있을 때만 렌더링 (Conditional Rendering) */}
        {feeds.length > 0 ? (
          feeds.map(post => <Post key={post.id} data={post} />)
        ) : (
          <p style={{ textAlign: 'center', marginTop: '50px' }}>데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
}

export default App;