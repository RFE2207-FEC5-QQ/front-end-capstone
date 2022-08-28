import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const Comparison = ({ mainProduct, currProduct }) => {
  const { item } = mainProduct;
  const { detail, salePrice, origPrice, rating } = currProduct;

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <React.Fragment>
      <Popup
        trigger={
          <StarBorderOutlinedIcon
            className='comparison-button'
            onClick={() => setOpen(open => !open)}
          />
        }
        // modal={true}
        open={open}
        onClose={closeModal}
        closeOnDocumentClick
        position='bottom right'>
        <div className="comparison-modal">
          <div className='comparison-header-container'>
            <div className='comparison-title'>COMPARING</div>
            <div className='comparison-content product-comparator'>
              <div>{detail.name}</div>
              <div></div>
              <div>Main Product Name</div>
            </div>
          </div>
          <div className='comparison-content'>
            <div className='product-current'>
              <div>{detail.category}</div>
              {salePrice
                ? <div>${salePrice}</div>
                : <div>${origPrice}</div>
              }
              {rating
              // Decide wether to use separate rating component for both this and related.
                ? <div>{rating[0].toFixed(1)} &#40;{rating[1]}&#41;</div>
                : <div>No Ratings Yet</div>
              }
            </div>
            <div className='product-comparator'>
              <div>Category</div>
              <div>Price</div>
              <div>Rating</div>
              <div>Rating</div>
              <div>Rating</div>
              <div>Rating</div>
              <div>Rating</div>
              <div>Rating</div>
              <div>Rating</div>
              <div>Rating</div>
            </div>
            <div className='product-main'>
              <div>Category</div>
              <div>$Price</div>
              <div>Rating</div>
            </div>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default Comparison;