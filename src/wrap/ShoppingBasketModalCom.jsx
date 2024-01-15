import React, { useRef } from "react";
import './scss/shoppingBasketModal.scss';
import { useDispatch,useSelector } from "react-redux";
import { shoppingBasketModal } from "../reducer/shoppingBasketModal";
import { useNavigate } from "react-router-dom";

export default function ShoppingBasketModalCom () {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const [isTrue, setIsTrue] = React.useState(false);

    const [state, setState] = React.useState({
        상품: [],
        cnt: 1,
        주문금액: 0
    })

    React.useEffect(()=>{
        let 상품 = [];
        let hap = 0;
        if(selector.cartReducer.cart.length > 0){
            상품 = selector.cartReducer.cart;
            selector.cartReducer.cart.map((item)=>{
                hap += (item.수량 * (item.정가 * (1 - item.할인율)))
            });
        }
        setState({
            ...state,
            상품: 상품,
            주문금액: hap
        })
    },[selector.cartReducer.cart])

    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(shoppingBasketModal(false));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.remove('on');
    }

    React.useEffect(()=>{
        //console.log(selector.quickMenuViewProduct.quickMenuViewProduct);
    },[])

    const onClickLogIn=(e)=>{
        e.preventDefault();
        dispatch(shoppingBasketModal(false));
        navigate('/signIn')
    }

    const onClickLogUp=(e)=>{
        e.preventDefault();
        dispatch(shoppingBasketModal(false));
        navigate('/signUp')
    }

    const onClickGotoBasket=(e)=>{
        e.preventDefault();
        dispatch(shoppingBasketModal(false));
        navigate('/cart');
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.remove('on');
    }

    return (
        <div id="shoppingBasketModal">
            <div className="container">
                <div className="title">                    
                    <span>장바구니</span>
                    <button className="goTo-btn" onClick={onClickGotoBasket}>장바구니 바로가기<img src="./images/cart/arr_r16_black.png" alt="" /></button>
                    <button type="button" className="btn-close" onClick={onClickClose}></button>
                </div>
                {
                    state.상품.length === 0 &&
                    (                        
                        <div className="content">
                            <div className="basket-box">
                                <img src="./images/index/ico_nodate.png" alt="" />
                                <p>장바구니가 비어있습니다.</p>
                            </div>
                            <div className="login-box">
                                <button onClick={onClickLogIn}>로그인</button>
                                <button onClick={onClickLogUp}>회원 가입하고 혜택 받기</button>
                            </div>
                            <span>아직도 이니스프리 회원이 아니세요?</span>
                        </div>
                    )
                }
                {
                    state.상품.length > 0 &&
                    (   
                        <div className="product-list">
                            <ul>
                            {
                                state.상품.map((item, idx)=>{
                                return(  
                                    <li>                                                  
                                        <div className="cart-list">                                        
                                            <div className="left-box">
                                                <span><img src={item.이미지} alt="" /></span>
                                            </div>
                                            <div className="right-box">
                                                <span>{item.제품명}</span>
                                                <div className="count-box">
                                                    <span>{item.수량}개</span>
                                                    <em>{(item.정가 * (1 -item.할인율) * item.수량).toLocaleString('ko-KR')} &nbsp;원</em>                                          
                                                </div>
                                            </div>
                                        </div>
                                    </li> 
                                    )
                                })  
                            }
                            </ul>
                            <div className="bottom">         
                                <h2>
                                    <span>장바구니 총 금액</span>
                                    <em>{Number(state.주문금액).toLocaleString('ko-KR')}원</em>
                                </h2>           
                                <h3>
                                    <span>배송비</span>
                                    <em>0원</em>
                                </h3>
                            </div>
                            <button>주문하기</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}