import { useState, useRef } from 'react';
import '../assets/css/card.css';
import html2canvas from "html2canvas";
import avatar from '../../assets/images/avatar.jpg';
import justdisplay from '../../assets/images/chineduImg.jpg';
import PopUpModal from './PopUpModal';
import RenderPopUp from './RenderPopUp';

const Card = () => {
    //handle Card click
    const handleCardClick = (id) => {
        setCardImg(avatar);
    }

    //Handle PopUp Modal 
    const [popUpBtn, setPopUpBtn] = useState(false);
    // Handling DetailspopUp trigger
    const [usePopUpBtn, setusePopUpBtn] = useState(false);

    //handle ImageChange
    //Handle setImg
    const [cardImg, setCardImg] = useState(avatar);

    const handleCardImgChange = (event) => {
        setCardImg(URL.createObjectURL(event.target.files[0]));
    }

    //function shareCard
    function shareCard(canvas) {
        canvas.toBlob((blob) => {
            const files = [new File([blob], 'imgFile.png',
                {
                    type: 'image/jpeg',
                    lastModified: new Date().getTime()
                })];
            let shareObj = { files: files };
            navigator.share(shareObj);
        }, 'image/jpg')
    }
    // download card
    function downloadCard(data) {
        const link = document.createElement('a');
        // ---
        link.href = data;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    //render card
    const [renderCardImg, setRenderCardImg] = useState("");

    //Handle card Download & share
    const printRef = useRef();

    const handleCard = async (option) => {
        // ---
        const digitalCard = printRef.current;
        const canvas = await html2canvas(digitalCard, { backgroundColor: null });
        const data = canvas.toDataURL('image/jpg');
        // ---
        switch (option) {
            case 'share': return shareCard(canvas);
            case 'render':
                setRenderCardImg(data);
                setusePopUpBtn(true)
                setPopUpBtn(false);
                break;
            default: return downloadCard(data)
        }
        // ---
    };
    return (
        <div className="cardComponent">
            <div id='hideDisplay' className="wrappereg" ref={printRef}>
                <img src={justdisplay} alt="display" />
                <div className="uploadImg">
                    <img src={cardImg} alt="" />
                </div>
            </div>
            <div
                className={`card-border `}
                onClick={() => handleCardClick()}
            >
                <div id='card'
                    className="card"
                    onClick={() => setPopUpBtn(true)}
                >
                    <img src={justdisplay} alt="display" />
                </div>
            </div >


            {/* PopUp Modal */}
            <PopUpModal trigger={popUpBtn} setTrigger={setPopUpBtn} handleCardImgChange={handleCardImgChange} imgSrc={cardImg} renderCard={handleCard} />

            <RenderPopUp trigger={usePopUpBtn} setTrigger={setusePopUpBtn} handleCard={handleCard} cardSrc={renderCardImg}>
            </RenderPopUp>
        </div >
    )
}

export default Card;