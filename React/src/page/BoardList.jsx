import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/board/list");
            setBoards(response.data);
        } catch (error) {
            console.error("데이터 불러오기 실패", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-center">현재 로딩 중.....</div>

    return (
  <div className="min-h-screen flex justify-center items-center bg-gray-50">
    <div className="max-w-5xl w-full">

      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
        게시글 리스트
      </h2>

      <div className="bg-white rounded-xl shadow-xl border p-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3">번호</th>
              <th className="px-6 py-3">제목</th>
              <th className="px-6 py-3">내용</th>
              <th className="px-6 py-3">작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map(board => (
              <tr
                key={board.id}
                className="border-b hover:bg-blue-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {board.id}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/board/${board.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {board.title}
                  </Link>
                </td>
                <td className="px-6 py-4 truncate max-w-xs">
                  {board.content}
                </td>
                <td className="px-6 py-4 text-xs text-gray-600">
                  {formatDistanceToNow(
                    new Date(board.createdAt),
                    { addSuffix: true, locale: ko }
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);


}

export default BoardList;