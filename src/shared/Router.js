import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../pages/Main';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Board from '../pages/Boards';
import Navbar from '../components/layout/Navbar';
import BoardCreate from '../pages/BoardCreate'
import Rolling from '../pages/Rolling';
import BoardDetail from '../pages/BoardDetail';



//1. 메인페이지, 로그인페이지, 정보공유 메인페이지,(o)
// 네이게이션 바 만들거임.(o)
//2. 메인페이지에서는 로그인 페이지와 회원가입 페이지로 가는 버튼이 있다. (o)
//3. 로그인이 되어있어야 작성페이지로 넘어간다.
//4. 로그인이 안되어있을경우 로그인 페이지가 나오게 된다.

const Router = () => {


  //로그인을 한user인지 아닌지 구별하기 위한 코드
    const[authenticate, setAuthenticate]= useState(false) // false: 로그인안됨. true:로그인됨
    useEffect(()=>{
        console.log("aaa",authenticate)
    },[authenticate])

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/api/users/login" element={<LogIn setAuthenticate={setAuthenticate}/>} />
                <Route path="/api/users/signup" element={<SignUp />} />
                <Route path="/api/boards" element={<BoardCreate />} />
                <Route path="/api/boards/main" element={<Board />} />
                <Route path="/api/boards/:id" element={<BoardDetail/>} />
                <Route path="/api/boards/:id" element={<BoardDetail/>} />
                <Route path="/api/rollingpapers" element={<Rolling />} />
                
                
                
            </Routes>
        </BrowserRouter> 
    );
};

export default Router;
