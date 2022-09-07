import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';

const Comparison = ({ mainProduct, currProduct }) => {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const [mainValues, setMainValues] = useState([]);
  const [currValues, setCurrValues] = useState([]);
  const [combinedVal, setCombinedVal] = useState([]);

  useEffect(() => {
    const allFeatures = new Set();
    const currFeatures = [];
    const mainFeatures = [];
    const currValues = [];
    const mainValues = [];
    const combined = [];

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
        if (mainProduct.features[mainIndex].value === null) {
          mainValues.push('N/A');
        } else {
          mainValues.push(mainProduct.features[mainIndex].value);
        }
      } else {
        mainValues.push('N/A');
      }
      if (currIndex !== -1) {
        if (currProduct.features[currIndex].value === null) {
          currValues.push('N/A');
        } else {
          currValues.push(currProduct.features[currIndex].value);
        }
      } else {
        currValues.push('N/A');
      }
    });

    // console.log('arrfeatures', arrFeatures);
    // console.log('currFeatures', currFeatures);
    // console.log('currValues', currValues);
    // console.log('mainFeatures', mainFeatures);
    // console.log('mainValues', mainValues);

    const mapFeatures = arrFeatures.map((value) => <span className='comp-values comp-category'>{value}</span>);
    const mapCurrValues = currValues.map((value) => <span className='comp-values'>{value}</span>);
    const mapMainValues = mainValues.map((value) => <span className='comp-values'>{value}</span>);



    for (let i = 0; i < arrFeatures.length; i++) {
      combined.push(<div className='comp-values1' key={i}>{mapCurrValues[i]} {mapFeatures[i]} {mapMainValues[i]}</div>);
    }
    // console.log(combined);
    setCombinedVal(combined);

  }, [mainProduct, currProduct]);


  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Popup
        trigger={<StarBorderOutlinedIcon
          aria-label='star-icon'
          className='modal-button'
          onClick={() => setOpen(open => !open)}
        />
        }
        open={open}
        onClose={handleClose}
        closeOnDocumentClick
        position='bottom right'>
        <div className="comparison-modal theme">
          <div className='comparison-header-container'>
            <div className='comparison-title'>COMPARING</div>
            <div className='comparison-contents product-name'>
              <div>{currProduct.name}</div>
              <div></div>
              <div>{mainProduct.name}</div>
            </div>
          </div>
          <div className='comparison-content'>
            {combinedVal}
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default Comparison;