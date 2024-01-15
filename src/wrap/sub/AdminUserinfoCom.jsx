import React from 'react';
import './scss/adminUserinfo.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { messageModal } from '../../reducer/messageModal';

export default function AdminUserinfoCom(){
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [state,setState]=React.useState({
        회원정보:[],

        pageList: 5, 
        page: 1,
        totalPage: 0, 
        pageNum: [], 

        pageListBtn: 5, 
        pageBtn: 1, 
        totalPageBtn: 0,
        pageNumBtn: [],
    })

    React.useEffect(()=>{
        axios({
            url:'http://gwonsj94.co.kr/innisfree/innisfree_admin_user_info.php',
            method:'GET'
        })
        .then((res)=>{
            console.log( 'AXIOS 성공!' );
            // console.log(res.data);
            if(res.status===200){
                // console.log(res.data)
                setState({
                    ...state,
                    회원정보: res.data,                 
                })
            }
            
        })
        .catch((err)=>{
            console.log( 'AXIOS 실패!' );
            console.log( err );
        });
        return;
    },[]);


    React.useEffect(()=>{
        if(state.회원정보.length>0){
            setState({
                ...state,
                totalPage: Math.ceil(state.회원정보.length/state.pageList),
                totalPageBtn: Math.ceil(Math.ceil(state.회원정보.length/state.pageList)/state.pageListBtn)
            })
        }
    }, [state.회원정보]);

    React.useEffect(()=>{

        const {totalPage, pageBtn, pageListBtn} = state;

            if( totalPage > 0 ){
                
                // 페이지네이션 버튼 그룹
                let frontNum = 0;     // 시작번호(앞번호)
                let rearNum = 0;      // 끝  번호(뒷번호)
                let pageNumBtn = [];  // pageNum[1,2,3,4,5]
                
                // 알고리즘
                frontNum = (((pageBtn-1) * pageListBtn) + 1); // 1   6  11  16  21  26 = 6-1 * 5 + 1
                rearNum  = frontNum + pageListBtn - 1;        // 5  10  15  20  25  30           
                
                if(rearNum > state.totalPage ){
                    rearNum = state.totalPage;
                }
                
                for(let i=frontNum; i<=rearNum; i++){
                    pageNumBtn = [...pageNumBtn, i];
                }
        
                setState({
                    ...state,
                    pageNumBtn: pageNumBtn
                })
            }

    }, [state.totalPage]);

    //   // 메세지모달 메소드
    //   const messageModalMethod=(msg)=>{
    //     const obj = {
    //         isMessageModal: true,
    //         isMsg: msg
    //     }
    //     dispatch(messageModal(obj));
    // }

    const onClickModify=(e,item)=>{
        e.preventDefault();
        navigate('/UserInfoModify',{state:item})
    }

   // 페이지 번호 클릭
   const onClickPage=(e, item)=>{
    e.preventDefault();
    setState({
        ...state,
        page: item
    })
}

    return (
        <div id='Userinfo'>
            <div className="container">
                <div className="title">
                    <h2>회원 관리</h2>
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>비밀번호</th>
                                <th>이름</th>
                                <th>휴대폰</th>
                                <th>이메일</th>
                                <th>주소</th>
                                <th>생년월일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            state.회원정보.length>0&&
                            state.회원정보.map((item,idx)=>{
                                if( Math.ceil((idx+1)/state.pageList) === state.page  ){
                                return(
                                    <tr key={item.아이디}>
                                    <td>{item.아이디}</td>
                                    <td>{item.비밀번호}</td>
                                    <td>{item.이름}</td>
                                    <td>{item.휴대폰}</td>
                                    <td>{item.이메일}</td>
                                    <td>{item.주소}</td>
                                    <td>{item.생년월일}</td>
                                    <div className="button-box">
                                            <button onClick={(e)=>onClickModify(e,item)}>수정</button>
                                    </div>
                            </tr>
                                )
                                }
                            })         
                            }
                        </tbody>
                    </table>
                    <div id="pagenation">
                    <div className="pagenation-box">
                        <ul>
                            {
                                state.pageNumBtn.map((item,idx)=>{
                                    return(
                                        <li><button className={state.page===idx+1?'on':''} onClick={(e)=>onClickPage(e, item)}>{item}</button></li>  
                                    )
                                })
                            }  
                        </ul> 
                    </div>   
                </div> 
                </div>
                
            </div>
        </div>
    );
};
