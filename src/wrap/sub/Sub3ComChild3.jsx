import React from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct';
import { useNavigate } from 'react-router-dom';

export default function Sub3ComChild2({btn1,btn2,btn3,btn4,btn5,btn6,btn7,viewProductMethod,path}){

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const slideWrap=React.useRef();
    const slideBar=React.useRef();

    const[state,setState]=React.useState({
        cnt:0,
        이벤트슬라이드:[],
        탭3버튼1제품1:[],
        탭3버튼1제품2:[],
        탭3버튼2제품1:[],
        탭3버튼2제품2:[],
        탭3버튼3제품1:[],
        탭3버튼4제품1:[],
        탭3버튼5제품1:[],
        탭3버튼6제품1:[],
        탭3버튼7제품1:[],
    })

    React.useEffect(()=>{

        axios({
            url:'./data/sub/sub3Tab3.json',
            method:'GET'
        })
        .then((result)=>{ 
            setState({
                ...state,
                이벤트슬라이드:result.data.eventSlide,
                탭3버튼1제품1:result.data.monthlyBest1top,
                탭3버튼1제품2:result.data.monthlyBest1bottom,
                탭3버튼2제품1:result.data.monthlyBest2top,
                탭3버튼2제품2:result.data.monthlyBest2bottom,
                탭3버튼3제품1:result.data.monthlyBest3top,
                탭3버튼4제품1:result.data.monthlyBest4top,
                탭3버튼5제품1:result.data.monthlyBest5top,
                탭3버튼6제품1:result.data.monthlyBest6top,
                탭3버튼7제품1:result.data.monthlyBest7top,
            })
        })
        .catch((error)=>{
        });
    },[]);

         // 메인슬라이드 메서드(함수)
     const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.transform = `translateX(${-433*state.cnt}px)`;
        // slideBar.current.style.transform=`scaleX(${0.11111*state.cnt})`; 
        // slideBar.current.style.transition = `all 0.6s ease-in-out`;
    }
         // 다음슬라이드 카운트 클릭이벤트
    const onClickNext=(e)=>{
        e.preventDefault();
        if(state.cnt>=9){
            setState({
                ...state,
                cnt:0
            })
        }
        else{
            setState({
                ...state,
                cnt:state.cnt+1
            })     
        }
    }

    // 이전슬라이드 카운트 클릭이벤트
    const onClickPrev=(e)=>{
        e.preventDefault();
        if(state.cnt<1){
            setState({
                ...state,
                cnt:8
            })
        }
        else{
            setState({
                ...state,
                cnt:state.cnt-1
            })    
        }
    }

    React.useEffect(()=>{        
        mainSlide();
    },[state.cnt]);

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
        <>
        {
            btn1&&
            <div className="content tab1btn1">
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼1제품1.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
            <div className="event-slide">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap}>
                            <Swiper
                            pagination={{
                            type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            rewind={true}
                        >                                
                        {     
                            state.이벤트슬라이드.length > 0 &&   
                            (                        
                                state.이벤트슬라이드.map((item, idx)=>{
                                    return(   
                                        <SwiperSlide>
                                        <li key={idx}>
                                            <div className="item">
                                                <a href="!#">
                                                    <span>{item.이벤트구분}</span>
                                                    <div className='img-box'>
                                                        <img src={`./images/sub/sub2/${item.이미지}`} alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <p>{item.날짜}</p>
                                                        <span>{item.상단} {item.하단}</span>               
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        </SwiperSlide>
                                    )
                                })  
                            ) 
                        }
                    </Swiper>
                        </ul>
                    </div>
                </div>               
            </div>
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼1제품2.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
        </div>
        }
        {
            btn2&&
            <div className="content tab1btn2">
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼2제품1.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
            <div className="event-slide">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap}>
                            <Swiper
                            pagination={{
                            type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            rewind={true}
                        >                                
                        {     
                            state.이벤트슬라이드.length > 0 &&   
                            (                        
                                state.이벤트슬라이드.map((item, idx)=>{
                                    return(   
                                        <SwiperSlide>
                                        <li key={idx}>
                                            <div className="item">
                                                <a href="!#">
                                                    <span>{item.이벤트구분}</span>
                                                    <div className='img-box'>
                                                        <img src={`./images/sub/sub2/${item.이미지}`} alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <p>{item.날짜}</p>
                                                        <span>{item.상단} {item.하단}</span>               
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        </SwiperSlide>
                                    )
                                })  
                            ) 
                        }
                    </Swiper>
                        </ul>
                    </div>
                </div>               
            </div>
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼2제품2.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
        </div>
        }
        {
           btn3&&
            <div className="content tab1btn3">
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼3제품1.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
            <div className="event-slide">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap}>
                            <Swiper
                            pagination={{
                            type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            rewind={true}
                        >                                
                        {     
                            state.이벤트슬라이드.length > 0 &&   
                            (                        
                                state.이벤트슬라이드.map((item, idx)=>{
                                    return(   
                                        <SwiperSlide>
                                        <li key={idx}>
                                            <div className="item">
                                                <a href="!#">
                                                    <span>{item.이벤트구분}</span>
                                                    <div className='img-box'>
                                                        <img src={`./images/sub/sub2/${item.이미지}`} alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <p>{item.날짜}</p>
                                                        <span>{item.상단} {item.하단}</span>               
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        </SwiperSlide>
                                    )
                                })  
                            ) 
                        }
                    </Swiper>
                        </ul>
                    </div>
                </div>               
            </div>
        </div>
        }
        {
            btn4&&
            <div className="content tab1btn4">
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼4제품1.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
            <div className="event-slide">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap}>
                            <Swiper
                            pagination={{
                            type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            rewind={true}
                        >                                
                        {     
                            state.이벤트슬라이드.length > 0 &&   
                            (                        
                                state.이벤트슬라이드.map((item, idx)=>{
                                    return(   
                                        <SwiperSlide>
                                        <li key={idx}>
                                            <div className="item">
                                                <a href="!#">
                                                    <span>{item.이벤트구분}</span>
                                                    <div className='img-box'>
                                                        <img src={`./images/sub/sub2/${item.이미지}`} alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <p>{item.날짜}</p>
                                                        <span>{item.상단} {item.하단}</span>               
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        </SwiperSlide>
                                    )
                                })  
                            ) 
                        }
                    </Swiper>
                        </ul>
                    </div>
                </div>               
            </div>
        </div>
        }
        {
            btn5&&
            <div className="content tab1btn5">
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼5제품1.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
            <div className="event-slide">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap}>
                            <Swiper
                            pagination={{
                            type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            rewind={true}
                        >                                
                        {     
                            state.이벤트슬라이드.length > 0 &&   
                            (                        
                                state.이벤트슬라이드.map((item, idx)=>{
                                    return(   
                                        <SwiperSlide>
                                        <li key={idx}>
                                            <div className="item">
                                                <a href="!#">
                                                    <span>{item.이벤트구분}</span>
                                                    <div className='img-box'>
                                                        <img src={`./images/sub/sub2/${item.이미지}`} alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <p>{item.날짜}</p>
                                                        <span>{item.상단} {item.하단}</span>               
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        </SwiperSlide>
                                    )
                                })  
                            ) 
                        }
                    </Swiper>
                        </ul>
                    </div>
                </div>               
            </div>
        </div>
        }
        {
            btn6&&
            <div className="content tab1btn6">
             <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼6제품1.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>    
            <div className="event-slide">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap}>
                            <Swiper
                            pagination={{
                            type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            rewind={true}
                        >                                
                        {     
                            state.이벤트슬라이드.length > 0 &&   
                            (                        
                                state.이벤트슬라이드.map((item, idx)=>{
                                    return(   
                                        <SwiperSlide>
                                        <li key={idx}>
                                            <div className="item">
                                                <a href="!#">
                                                    <span>{item.이벤트구분}</span>
                                                    <div className='img-box'>
                                                        <img src={`./images/sub/sub2/${item.이미지}`} alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <p>{item.날짜}</p>
                                                        <span>{item.상단} {item.하단}</span>               
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        </SwiperSlide>
                                    )
                                })  
                            ) 
                        }
                    </Swiper>
                        </ul>
                    </div>
                </div>               
            </div>
        </div>
        }
        {
            btn7&&
            <div className="content tab1btn7">
            <div className="product-list">
                    <ul>
                        {
                        state.탭3버튼7제품1.map((item,idx)=>{
                            return(          
                                <li key={item.번호}>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub3/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub3/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub3/${item.변경이미지}`} alt="" />
                                        </div>                                         
                                        <div className="rank">
                                            <span>{item.랭크}</span>
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
                                            <img src="./images/sub/sub3/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </li>
                            )
                        })
                   
                        }
                </ul>

            </div>
            <div className="event-slide">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap}>
                            <Swiper
                            pagination={{
                            type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            rewind={true}
                        >                                
                        {     
                            state.이벤트슬라이드.length > 0 &&   
                            (                        
                                state.이벤트슬라이드.map((item, idx)=>{
                                    return(   
                                        <SwiperSlide>
                                        <li key={idx}>
                                            <div className="item">
                                                <a href="!#">
                                                    <span>{item.이벤트구분}</span>
                                                    <div className='img-box'>
                                                        <img src={`./images/sub/sub2/${item.이미지}`} alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <p>{item.날짜}</p>
                                                        <span>{item.상단} {item.하단}</span>               
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        </SwiperSlide>
                                    )
                                })  
                            ) 
                        }
                    </Swiper>
                        </ul>
                    </div>
                </div>               
            </div>
        </div>
        }
        </>
    );
};

