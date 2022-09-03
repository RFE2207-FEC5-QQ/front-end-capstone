import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';

const Comparison = ({ mainProduct, currProduct }) => {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([]);

  // useEffect(() => {
  const allFeatures = new Set();

  mainProduct.features.forEach((featureObj) => {
    // console.log('feature me', feature);
    allFeatures.add(featureObj.feature);
  });
  currProduct.features.forEach((featureObj) => {
    allFeatures.add(featureObj.feature);
  });

  // console.log(allFeatures);
  // setFeatures(allFeatures);
  // }, [mainProduct]);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Popup
        trigger={<StarBorderOutlinedIcon
          className='modal-button'
          onClick={() => setOpen(open => !open)}
        />
        }
        open={open}
        onClose={handleClose}
        closeOnDocumentClick
        position='bottom right'>
        {/* <div> */}
        <div className="comparison-modal theme">
          <div className='comparison-header-container'>
            <div className='comparison-title'>COMPARING</div>
            <div className='comparison-content product-name'>
              <div>{currProduct.name}</div>
              <div></div>
              <div>{mainProduct.name}</div>
            </div>
          </div>
          <div className='comparison-content'>
            <div className='product-current'>
              <div>{currProduct.category}</div>
            </div>
            <div className='product-comparator'>
              {Array.from(allFeatures).map((feature) => <div>{feature}</div>)}
            </div>
            <div className='product-main'>

            </div>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default Comparison;