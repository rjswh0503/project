import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Home = () => {

    return (
        <>
            <div>
                <h1>Home</h1>

            </div>
            <div>
                <Link to="/board/list">
                <h3>게시글 보러가기</h3>
                </Link>
            </div>
        </>
    )
}

export default Home;