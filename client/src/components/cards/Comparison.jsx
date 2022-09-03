import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';

const Comparison = ({ mainProduct, currProduct }) => {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const [mainValues, setMainValues] = useState([]);
  const [currValues, setCurrValues] = useState([]);

  useEffect(() => {
    const allFeatures = new Set();
    const currFeatures = [];
    const mainFeatures = [];
    const currValues = [];
    const mainValues = [];

    mainProduct.features.forEach((featureObj) => {
      allFeatures.add(featureObj.feature);
      mainFeatures.push(featureObj.feature);
    });
    currProduct.features.forEach((featureObj) => {
      allFeatures.add(featureObj.feature);
      currFeatures.push(featureObj.feature);
    });

    const arrFeatures = Array.from(allFeatures);
    setFeatures(arrFeatures);

    arrFeatures.forEach((feature) => {
      const mainIndex = mainFeatures.indexOf(feature);
      const currIndex = currFeatures.indexOf(feature);
      if (mainIndex !== -1) {
        mainValues.push(mainProduct.features[mainIndex].value);
      } else {
        mainValues.push('N/A');
      }
      if (currIndex !== -1) {
        currValues.push(currProduct.features[currIndex].value);
      } else {
        currValues.push('N/A');
      }
    });

    setMainValues(mainValues);
    setCurrValues(currValues);

  }, [mainProduct, currProduct]);


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
              {/* <div>{currProduct.name}</div>
              <div></div>
              <div>{mainProduct.name}</div> */}
            </div>
          </div>
          <div className='comparison-content'>
            <div className='product-current'>
              {currValues.map((value) => <div>{value}</div>)}
            </div>
            <div className='product-comparator'>
              {Array.from(features).map((feature) => <div>{feature}</div>)}
            </div>
            <div className='product-main'>
              {mainValues.map((value) => <div>{value}</div>)}
            </div>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default Comparison;