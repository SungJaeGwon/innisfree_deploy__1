import React from 'react';
import axios from 'axios';
import './scss/productView.scss'
import { useSelector, useDispatch } from 'react-redux';
import { viewProduct } from '../reducer/viewProduct';
import { useNavigate } from 'react-router-dom';
import { cartMethod } from '../reducer/cartReducer';

export default function ProductViewCom(){

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        isSelect: false,
        cnt: 1,
        totalPay: selector.viewProduct.current.판매가,
        cart: []
    })
    
    React.useEffect(()=>{
        if(localStorage.getItem('INNISFREE_VIEWPRODUCT') !== null){
            const obj = JSON.parse(localStorage.getItem('INNISFREE_VIEWPRODUCT'));
            dispatch(viewProduct(obj));
        }
    },[])

    React.useEffect(()=>{
        setState({
            ...state,
            totalPay: state.cnt * Number(selector.viewProduct.current.판매가)
        })
    },[state.cnt])

    const onClickPlus=(e)=>{
        e.preventDefault();
        setState({
            cnt: state.cnt + 1
        })
    }
    const onClickMinus=(e)=>{
        e.preventDefault();
        if(state.cnt < 2){
            setState({
                ...state,
                cnt: state.cnt
            })
        }
        else{
            setState({
                cnt: state.cnt - 1
            })
        }
    }

    // 데이터베이스 장바구니 목록 저장 함수
    const cartDBSave=(item, idx)=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.signInData.id);
        formData.append('번호', item.번호);
        formData.append('이미지', item.이미지);
        formData.append('제품명', item.제품명);
        formData.append('할인율', item.할인율);
        formData.append('판매가', item.판매가);
        formData.append('정가', item.정가);
        formData.append('제품코드', item.제품코드);
        formData.append('수량', item.수량);
        axios({
            url: 'http://gwonsj94.co.kr/innisfree/innisfree_cart_table_insert.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    cartDBSelect();     
                }
                else if(res.data === 2){
                    cartDBSelect();     
                }
                else if(res.data === 0){
                    alert('장바구니 수량 변경에 실패했습니다');
                }
                else if(res.data === -1){
                    alert('장바구니 목록 추가에 실패했습니다');
                }
                else{
                    alert('데이터 확인 후 다시 시도해주세요');
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    // 데이터베이스 장바구니 목록 조회 함수
    const cartDBSelect=()=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.signInData.id);
        axios({
            url: 'http://gwonsj94.co.kr/innisfree/innisfree_cart_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data !== null){                    
                    localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify(res.data));
                    dispatch(cartMethod(res.data));
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const onClickCart=(e)=>{
        e.preventDefault();
        let cart = selector.viewProduct.current;
        cart = {
            ...cart,
            제품코드: selector.viewProduct.current.번호,
            수량: state.cnt
        };

        if(selector.signIn.signInData === null){
            let arr = [];
            if(localStorage.getItem('INNISFREE_CART_PRODUCT') !== null){            
                arr = JSON.parse(localStorage.getItem('INNISFREE_CART_PRODUCT'));
            }

            let imsi = arr.map((item)=>item.제품코드 === cart.제품코드)
            if(imsi.includes(true)){
                arr = arr.map((item)=>item.제품코드 === cart.제품코드 ? {...item, 수량:item.수량 + cart.수량} : item);
            }
            else{
                arr = [...arr, cart];
            }

            localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify(arr));
            setState({
                ...state,
                cart: arr
            })
            dispatch(cartMethod(arr));        
        }
        else{
            cartDBSave(cart);
        }
    }
    
    React.useEffect(()=>{
        let arr = [];
        if(localStorage.getItem('INNISFREE_CART_PRODUCT') !== null){            
            arr = JSON.parse(localStorage.getItem('INNISFREE_CART_PRODUCT'));
        }
        setState({
            ...state,
            cart: arr
        });
        dispatch(cartMethod(arr));
        return;
    },[])

    return (
        <main id='productView'>
            <section id='section1'>
                <div className="container">
                    <div className="content">
                        <div className="left">
                            <img src={selector.viewProduct.current.이미지} alt="" />
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <h2>
                                        <em className={selector.viewProduct.current.베스트 === "" ? 'on' : ''}>{selector.viewProduct.current.베스트}</em>
                                        <span className={selector.viewProduct.current.베스트 === "" ? 'on' : ''}>{selector.viewProduct.current.제품명}</span>
                                    </h2>
                                </li>
                                <li><em>{selector.viewProduct.current.제품특징}</em></li>
                                <li>
                                    <h3>                                        
                                        <strong className={Number(selector.viewProduct.current.할인율) === 0 ? 'on' : ''}>{Math.round(Number(selector.viewProduct.current.정가) * (1 - Number(selector.viewProduct.current.할인율))).toLocaleString('ko-KR')}</strong>
                                        {
                                            Number(selector.viewProduct.current.할인율) !== 0 &&    
                                            <h6>{Math.round(Number(selector.viewProduct.current.할인율) * 100)}%</h6>
                                        }
                                        <p className={Number(selector.viewProduct.current.할인율) === 0 ? 'on' : ''}>{Math.round(Number(selector.viewProduct.current.정가)).toLocaleString('ko-KR')}</p>
                                    </h3>
                                </li>
                            </ul>
                            <ul className='table'>
                                <li>
                                    <div className="col1">뷰티포인트</div>
                                    <div className="col2">
                                        <em>{selector.viewProduct.current.배송}</em>
                                        <p>결제 금액의 1% 적립</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">배송비</div>
                                    <div className="col2">
                                        <em>무료배송</em>
                                    </div>
                                </li>     
                                <li>                                    
                                    <div className="count-left">
                                        <ul>
                                            <li><button className='dec-btn' onClick={onClickMinus}></button></li>
                                            <li><span>{state.cnt}</span></li>
                                            <li><button className='inc-btn' onClick={onClickPlus}></button></li>
                                        </ul> 
                                        <p className={Number(selector.viewProduct.current.할인율) === 0 ? 'on' : ''}>{Math.round(Number(selector.viewProduct.current.정가) * (1 - Number(selector.viewProduct.current.할인율))).toLocaleString('ko-KR')}원</p>
                                    </div>
                                </li>
                            </ul>
                            <div className='sum-payment'>
                                <em>합계</em>
                                <strong>{Number(state.totalPay).toLocaleString('ko-KR')}</strong>
                                <i>원</i>
                            </div>
                            <div className="button-box">
                                <button></button>
                                <button></button>
                                <button onClick={onClickCart}>장바구니</button>
                                <button>바로구매</button>
                            </div>
                        </div>
                    </div>
                </div>                 
            </section>           
        </main>
    );
};