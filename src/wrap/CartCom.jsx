import React from 'react';
import axios from 'axios';
import './scss/cart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartMethod } from '../reducer/cartReducer';
import { viewProduct } from '../reducer/viewProduct';

export default function CartCom(){

    const selector = useSelector((state)=>state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        상품: [],
        주문금액: 0,
    })
    const [chk, setChk] = React.useState([])

    React.useEffect(()=>{    
        let imsi = [];
        if(selector.cartReducer.cart.length > 0){
            imsi = selector.cartReducer.cart.map((item)=>item.제품코드)
        }
        setChk(imsi);
        return;
    },[])

    React.useEffect(()=>{
        let 상품 = [];
        let hap = 0;
        if(selector.cartReducer.cart.length > 0){
            상품 = selector.cartReducer.cart;
            selector.cartReducer.cart.map((item)=>{
                chk.map((code)=>{
                    if(code === item.제품코드){                        
                        hap += (Number(item.수량) * Number(item.정가) * (1 - Number(item.할인율)))
                    }
                })            
            });
        }
        setState({
            ...state,
            상품: 상품,
            주문금액: hap
        })
    },[selector.cartReducer.cart, chk])

    const onClickSignIn=(e)=>{
        e.preventDefault();
        navigate('/signIn');
    }

    const cartDBUpdateListSelect=(사용자아이디)=>{
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        axios({
            url: 'http://gwonsj94.co.kr/innisfree/innisfree_cart_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data !== null){
                    dispatch(cartMethod(res.data));
                    localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify(res.data));
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const cartDBUpdate=(사용자아이디, 제품코드, 결과)=>{
        let 수량 = 0;
        결과.map((item)=>item.제품코드 === 제품코드 ? 수량 = Number(item.수량) : 수량)
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);
        formData.append('수량', 수량);
        axios({
            url: 'http://gwonsj94.co.kr/innisfree/innisfree_cart_table_update.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    cartDBUpdateListSelect(사용자아이디);
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    const onClickDecBtn=(e, idx)=>{
        e.preventDefault();
        let cart = selector.cartReducer.cart;
        const res = cart.map((item)=>{  
            return idx === item.제품코드 ? {...item, 수량 : (Number(item.수량) <= 1 ? 1 : Number(item.수량) - 1)} : {...item}
        });
        dispatch(cartMethod(res));
        localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify(res));

        if(selector.signIn.signInData !== null){
            cartDBUpdate(selector.signIn.signInData.id, idx, res);
        }   
    }
    
    const onClickIncBtn=(e, idx)=>{
        e.preventDefault();
        let cart = selector.cartReducer.cart;
        const res = cart.map((item)=>{  
            return idx === item.제품코드 ? {...item, 수량 : Number(item.수량) + 1} : {...item}
        });
        dispatch(cartMethod(res));
        localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify(res));

        if(selector.signIn.signInData !== null){
            cartDBUpdate(selector.signIn.signInData.id, idx, res);
        }   
    }

    const onChangeAllCheck=(e)=>{
        let imsi = [];
        if(e.target.checked){
            imsi = selector.cartReducer.cart.map((item)=>item.제품코드);
            setChk(imsi);
        }
        else{
            setChk([]);
        }
    }

    const onChangeCheck=(e)=>{
        if(e.target.checked){
            setChk([
                ...chk,
                e.target.value
            ])
        }
        else{
            let imsi = chk.filter((item)=>item !== e.target.value);
            setChk(imsi);
        }
    }
    
    const cartDBDelete=(사용자아이디, 제품코드)=>{
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);
        axios({
            url: 'http://gwonsj94.co.kr/innisfree/innisfree_cart_table_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    cartDBUpdateListSelect(사용자아이디);
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const onClickDelBtn=(e, code)=>{
        e.preventDefault();
        let cart = selector.cartReducer.cart;
        let res = cart.filter((item)=>item.제품코드!==code);        
        dispatch(cartMethod(res));
        localStorage.removeItem('INNISFREE_CART_PRODUCT', JSON.stringify(res));

        res = chk.filter((item)=>item!== code);
        setChk(res);

        cartDBDelete(selector.signIn.signInData.id, code, res);
    }

    const onClickSelectListDelBtn=(e)=>{
        e.preventDefault();
        let cart = selector.cartReducer.cart;
        let res = cart.filter((item)=>!chk.includes(item.제품코드));        
        dispatch(cartMethod(res));
        localStorage.removeItem('INNISFREE_CART_PRODUCT', JSON.stringify(res));

        res = chk.filter((item)=>!chk.includes(item.제품코드));
        setChk(res);

        chk.map((item)=>
            cartDBDelete(selector.signIn.signInData.id, item)
        )
    }
    
    const onClickViewProductPage=(e, item)=>{
        e.preventDefault();
        dispatch(viewProduct(item));
        localStorage.setItem('INNISFREE_VIEWPRODUCT', JSON.stringify(item))
        navigate('/productView');
    }
    return (
        <main id='cart'>
            <section id='section1'>
                <div className="container">
                    <div className="title">
                        <h2>장바구니</h2>
                    </div>                        
                    <div className="content">
                        <div className="left">
                            <div className="cart-btn cart-header">
                                <div className="button-box">
                                    <label htmlFor="">
                                        <input type="checkbox"
                                                name='allCheck'
                                                id='allCheck'
                                                value='allCheck'
                                                onChange={onChangeAllCheck} 
                                                checked={chk.length === selector.cartReducer.cart.length}
                                        />
                                        <span>전체선택</span>
                                    </label>
                                    <button onClick={onClickSelectListDelBtn}>선택삭제</button>
                                </div>
                            </div>
                            <div className="cart-list">
                                <div className="cart-list-wrap">
                                    {
                                        state.상품.length === 0 &&
                                        (                                            
                                        <div className="none-cart-list">                                        
                                            <img src="./images/cart/ico_nodate.png" alt="" />
                                            <p className='cart-caption'>장바구니에 담긴 제품이 없습니다.</p>
                                        </div>
                                        )
                                    }    
                                    {
                                        state.상품.length > 0 &&
                                        (   
                                            <ul>
                                            {
                                                state.상품.map((item, idx)=>{
                                                return(  
                                                    <li>                                                  
                                                        <div className="cart-list">                                        
                                                            <div className="left-box">
                                                                <span>
                                                                    <input type="checkbox"
                                                                            name='cartChk'
                                                                            id={`cartChk${idx}`}
                                                                            value={item.제품코드}
                                                                            checked={chk.includes(item.제품코드)} 
                                                                            onChange={onChangeCheck}
                                                                    />
                                                                </span>
                                                                <span onClick={(e)=>onClickViewProductPage(e, item)}><img src={item.이미지} alt="" /></span>
                                                                <span onClick={(e)=>onClickViewProductPage(e, item)}>{item.제품명}</span>
                                                            </div>
                                                            <div className="right-box">
                                                                <div className="count-box">     
                                                                    <ul>
                                                                    <li><button className='dec-btn' onClick={(e)=>onClickDecBtn(e, item.제품코드)}></button></li>
                                                                    <li><span>{Number(item.수량)}</span></li>
                                                                    <li><button className='inc-btn' onClick={(e)=>onClickIncBtn(e, item.제품코드)}></button></li>
                                                                    </ul>               
                                                                    <span>
                                                                        <em>{(Number(item.정가) * (1 -Number(item.할인율)) * Number(item.수량)).toLocaleString('ko-KR')}원</em>
                                                                        <em>+0p</em>                         
                                                                    </span>           
                                                                    <button><img src="./images/cart/icon_x_off.svg" alt="" /></button>
                                                                </div>
                                                                <div className="del-btn">
                                                                    <button onClick={(e)=>onClickDelBtn(e, item.제품코드)}><img src="./images/cart/ico_close24_gray.png" alt="" /></button>
                                                                </div>                                            
                                                            </div>
                                                        </div>
                                                    </li> 
                                                    )
                                                })  
                                            }
                                            </ul>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {
                                selector.signIn.signInData === null &&
                                (
                                <div className="logIn-box">
                                    <ul>
                                        <li>
                                            <h2>                                            
                                                <img src="./images/cart/ico_mypage.png" alt="" />
                                                <span>로그인</span>
                                            </h2>
                                        </li>
                                        <li>
                                            <p>로그인을 하시면 지금 보고있는 제품을 <br/> 나중에도 확인하실 수 있습니다.</p>
                                        </li>
                                        <li>
                                            <button onClick={onClickSignIn}>로그인</button>
                                        </li>
                                    </ul>
                                </div>
                                )
                            }
                            <div className="payment-box">
                                <ul>
                                    <li>
                                        <h2>결제정보</h2>
                                    </li>
                                    <li>
                                        <strong>주문금액</strong>
                                        <span>{(state.주문금액).toLocaleString('ko-KR')}원</span>
                                    </li>
                                    <li>
                                        <strong>배송비</strong>
                                        <span>무료</span>
                                    </li>
                                    <li>
                                        <strong>적립 예정 뷰티포인트</strong>
                                        <span>{0}P</span>
                                    </li>
                                    <li><hr /></li>
                                    <li>
                                        <strong>결제 예정 금액</strong>
                                        <span>{(state.주문금액).toLocaleString('ko-KR')}원</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="button-box">
                                <button>주문하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

