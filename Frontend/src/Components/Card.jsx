import PropTypes from 'prop-types';

const Card = ({ image, name }) => {
    return (
        <div className='h-full w-full xl:h-96 card image-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300'>
            <figure>
                <img src={image} alt={name} className='w-full' />
            </figure>
            <div className='card-body'>
                <div className='card-actions justify-end mt-auto'>
                    <button className='btn btn-primary'>{name}</button>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Card;
