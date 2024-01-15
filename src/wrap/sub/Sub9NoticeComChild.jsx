import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function Sub9NoticeComChild({공지사항}){
    const navigate = useNavigate();
    const selector = useSelector((state)=>state);

    const [state,setState]=React.useState({
        pageList: 10, 
        page: 1,
        totalPage: 0, 
        pageNum: [], 

        pageListBtn: 10, 
        pageBtn: 1, 
        totalPageBtn: 0,
        pageNumBtn: [],
    })

    const onClickView =(e,item)=>{
        e.preventDefault();
        navigate('/sub9View',{state:item});
    }

    const onClickInsert=(e)=>{
        e.preventDefault();
        navigate('/sub9Insert');
    }

    React.useEffect(()=>{
        if(공지사항.length>0){
            setState({
                ...state,
                totalPage: Math.ceil(공지사항.length/state.pageList),
                totalPageBtn: Math.ceil(Math.ceil(공지사항.length/state.pageList)/state.pageListBtn)
            })
        }
    }, [공지사항]);

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

      // 페이지 번호 클릭
      const onClickPage=(e, item)=>{
        e.preventDefault();
        setState({
            ...state,
            page: item
        })
    }

    return ( 
        <div className="content">
            <div className="sub-title">
                <p>총<strong>{공지사항.length}</strong>개</p>
            </div>
                <ul>
                        {
                            공지사항.length > 0 &&(
                            공지사항.map((item,idx)=>{
                                if( Math.ceil((idx+1)/state.pageList) === state.page  ){
                                    return(
                                    <li key={item.번호} onClick={(e)=>onClickView(e, item)}>
                                        <ul>
                                            <li className='col1'>{item.번호}</li>
                                            <li className='col2'><div className="type"><span>{item.유형}</span>{item.제목}</div></li>
                                            <li className='col3'>{`${new Date(item.작성일).getFullYear()}.${new Date(item.작성일).getMonth()+1}.${new Date(item.작성일).getDate()}`}</li>
                                        </ul>
                                    </li>
                                    )
                                }
                            })
                            )
                        }
                </ul>
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
                {selector.adminsignIn.adminsignInData!==null&&
                    <div className="button-box">
                    <button className='insertBtn' onClick={onClickInsert}>글쓰기</button>
                </div>}
    </div>
    );
};

