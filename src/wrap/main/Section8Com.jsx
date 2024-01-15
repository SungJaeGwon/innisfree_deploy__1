import React from "react";
import './scss/section8.scss';
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { viewProduct } from "../../reducer/viewProduct";
import { viewProductIsFlag } from "../../reducer/viewProductIsFlag";
import { quickMenuViewProduct } from "../../reducer/quickMenuViewProduct";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Section8Com ({path}) {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();


    const [state, setState] = React.useState({
        slide: [],
        n: 0,
        location: ''
    });

    React.useEffect(()=>{
        axios({
            url: './data/index/section3.json',
            method: 'GET',
        }).then((res)=>{
            setState({
                ...state,
                slide: res.data.slide,
                n: res.data.slide.length,
                location: 'section3'
            })
        }).catch((err)=>{
            console.log("AXIOS 오류 " + err );
        })
    },[])

    const onClickViewProduct=(e, item, route)=>{
        e.preventDefault();
        let obj = {
            번호 : item.번호,
            이미지: `${route}${item.이미지}`,
            베스트: item.베스트,
            제품명: item.제품명,
            상품이름 : item.상품이름,
            정가 : item.정가,
            할인율 : item.할인율,
            판매가 : Math.round(item.정가 * (1- item.할인율)),
            태그1: item.태그1,
            태그2: item.태그2
        }
        navigate('/productView');
        localStorage.setItem('INNISFREE_VIEWPRODUCT', JSON.stringify(obj));
        dispatch(viewProduct(obj));
    }

    React.useEffect(()=>{
        let imsi = [];
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            if(Object.keys(selector.viewProduct.current).length > 0){
                imsi = [selector.viewProduct.current];
                localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(imsi));
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
            }
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            let filterResult = result.map((item) => (item.번호) === selector.viewProduct.current.번호 ? true : false)
            if(filterResult.includes(true) !== true){
                if(Object.keys(selector.viewProduct.current).length > 0){
                    result = [selector.viewProduct.current, ...result];
                    localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(result));
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
                }
            }            
        }
    },[selector.viewProduct.current]);
    
    React.useEffect(()=>{
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            return;
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            if(result.length > 0){                
                dispatch(quickMenuViewProduct(result));
            }
        }
    },[selector.viewProductIsFlag.isFlag]);

    return (
        <div id="section8">
            <div className="container">
                <div className="title">
                    <div className="h-group">
                        <h2>이 제품 어때요?</h2>
                        <button type="button" className="btn-arr">더보기</button>
                    </div>
                </div>
                <div className="content">
                    <div className="slide-view">
                        <ul className="product-list">
                            <Swiper
                            pagination={{type: 'progressbar'}}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            slidesPerView={5}
                            rewind={true}
                            >
                            {
                                state.slide.map((item, idx)=>{
                                    return (      
                                        <SwiperSlide>
                                        <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/index/')}>
                                            <div className="img">                                            
                                                <img src={`./images/index/${item.이미지}`} alt="" />          
                                                <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                                    <img src={`./images/index/${item.변경이미지}`} alt="" />
                                                </div> 
                                                <div className="hover-btn">
                                                    <button className='heartBtn'></button>
                                                    <button className='cartBtn'></button>
                                                    <button className='buyBtn'></button>
                                                </div>
                                            </div>  
                                            <div className="product-txt-box">
                                                <div className="name">
                                                    <strong>{item.베스트}</strong> {item.제품명}
                                                </div>
                                                <div className="price-box">
                                                    <span className={`price${item.할인율 === 0 ? ' on' : ''}`}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}</span>

                                                    {
                                                        item.할인율 !== 0 &&                                                
                                                        <span className='sale'>{Math.round(item.할인율 * 100)}%</span>
                                                    }                                                       
                                                    {                                            
                                                        item.할인율 !== 0 &&
                                                        <strong className='cost'>{item.정가.toLocaleString('ko-KR')}</strong>
                                                    }                                         
                                                </div>
                                                <div className="sticker-box">
                                                    <span className={item.증정 === '' ? 'off' : ''}>{item.증정}</span>
                                                </div>
                                                <div className="hash-box">
                                                    <button className={`tag1${item.태그1 === '' ? ' on' : ''}`}>{'#'+item.태그1}</button>
                                                    <button className={`tag2${item.태그2 === '' ? ' on' : ''}`}>{'#'+item.태그2}</button>
                                                </div>
                                                <div className="review">
                                                    <img src="./images/index/ico_star.png" alt="" />
                                                    <p>4.8 (3,531)</p>
                                                </div>
                                            </div>                                      
                                        </a>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            </Swiper>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}