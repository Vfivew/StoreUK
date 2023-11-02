import banner from '../../../img/banner.jpg'

const BannerDiscount = () => {
    return (
        <div className='banner-discount'>
            <div className='banner-discount-wrapper'>
                <img src={banner} alt="banner-discount" />
                <span>Знижки до 30% на акційни товари</span>
                <div className='gradient'></div>
            </div>
        </div>
    );
};

export default BannerDiscount;