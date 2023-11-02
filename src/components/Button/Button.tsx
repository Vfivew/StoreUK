import './Button.scss'

const Button = () => {
    return (
        <div>
            <button className='button'>
                <div className="wave"></div>
                <span className='span'>Water Button</span>
            </button>
        </div>
    );
};

export default Button;