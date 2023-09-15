import { MainArea } from './styles';
import { useGlobal } from '../../contexts/GlobalContext';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import ReactLoading from 'react-loading';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Z3() {

  const [popup, setPopup] = useState(false);
  const Web3 = require("web3");

  const [singuppopup, setSinguppopup] = useState(false);
  const { invokeServer } = useGlobal();
  const [Stage, setStage] = useState([]);
  const {  address, isConnected } = useAccount();

  //****************** AFTER VERIFY USER  **************************/
  const [popupStage, setPopupStage] = useState([]);


  const [lodingpopup, setLodingpopup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [downlines_id, setDownlines_id] = useState(true);

//************************************* SEND PAYMENT IN UPLIEN ADDERSS  ***************************************/


  const closeLoading = () => {
  setLodingpopup(false);
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const stage = searchParams.get('stage');
  const plan = searchParams.get('plan');
  const id = searchParams.get('id');
  
//************************************* CHECK PACKAGE AVAILABLELITY  ***************************************/

const loadingStage = () => {
  
  invokeServer('post', '/api/plans/cycle', {
   stage: stage,
   plan: plan,
   member_id : id
 })
   .then((r) => {

   setLodingpopup(false);

   const stageinfo = r.data.msg[0];

   console.log(" ===========> stageinfo",stageinfo);
   
   setPopupStage(stageinfo);
   setPopup(true);
   setDownlines_id(stageinfo.downlineIds);
   
   })
   .catch((err) => {
     console.log(`${err.message}`);
   });

};


const loadingStage1 = () => {
  
  invokeServer('post', '/api/plans/cycle', {
   stage: stage,
   plan: plan,
   member_id : id
 })
   .then((r) => {

   setLodingpopup(false);

   const stageinfo = r.data.msg[0];

   console.log(" ===========> stageinfo",stageinfo);
   
   setPopupStage(stageinfo);
   setPopup(true);
   
   })
   .catch((err) => {
     console.log(`${err.message}`);
   });

};

  useEffect(() => {  

  loadingStage();

  }, []);

  
  
  const [currentIndex, setCurrentIndex] = useState(0);

  

  const handleNext = () => {
    setLodingpopup(true);
    loadingStage();

    if (currentIndex < downlines_id.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    setLodingpopup(true);
    loadingStage();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  return (
    <MainArea>

      {/* <div>
        <p>Stage: {stage}</p>
        <p>Plan: {plan}</p>
        <p>ID: {id}</p>
      </div> */}


    { //************************* LOADING POPUP */
    lodingpopup && (
            <div className="popup-area is_loading">
              <div className="popup-area-inner">
                        
                  <>
                  <div className='isLodingtrue'>
                  {isLoading && (
                      <ReactLoading
                        type={"spokes"}
                        color={"#ffffff"}
                        height={100}
                        width={100}
                      />
                  )}
                  </div>
              
                  </>
              
              </div>
            </div>
          )}
    
<>


<div className="x3-body">
      <div className="x3-body-inner">

      { //************************* LOADING POPUP */
    popup && (

      <div className="">
          <div className="popup-area-inner">
              
            <ul className="popup-header">
              <li>Lvl {popupStage.level}</li>
              <li>ID {popupStage.ID}</li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2000 2000"
                  width="2000"
                  height="2000"
                >
                  <path
                    d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0"
                    fill="#53ae94"
                  />
                  <path
                    d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18"
                    fill="#fff"
                  />
                </svg>{' '}
                {popupStage.stage_fees}
              </li>
            </ul>

            <ul  className="popup-body">

                {popupStage.rols.length > 0 ? (
                  popupStage.rols.map((role, index) => (
                    <li key={index}>
                   {role.uusersid}
                    </li>
                  ))
                ) : (
                  <>

                 <li>
                   0
                  </li>

                  <li>
                   0
                  </li>

                  <li>
                   0
                  </li>
                  
                  </>
                )}
              </ul>

            <ul className="popup-footer">
              <li>
                <strong>Partners</strong>
                <span>
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                  </svg>{' '}
                  { popupStage.member_count}
                </span>
              </li>
              <li>
                <strong>Cycles</strong>
                <span>
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-repeat"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path
                      fillRule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                    />
                  </svg>{' '}
                  { popupStage.cycle_count}
                </span>
              </li>
              <li>
                <strong>Total Level Revenue</strong>
                <span>
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-wallet2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                  </svg>{' '}
                  0 USDT
                </span>
              </li>
            </ul>

              <div className='buttons'>
                                
                <Link
                  to={`/z33?stage=${popupStage.stage_id}&plan=1&id=${downlines_id[currentIndex]}`}
                >
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={currentIndex === 0 ? "btn-unnaked disabledButton" : "btn-unnaked"}
                  >
                    Previous
                  </button>
                </Link>

                <Link
                  to={`/z33?stage=${popupStage.stage_id}&plan=1&id=${downlines_id[currentIndex]}`}
                >
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === downlines_id.length - 1}
                    className={
                      currentIndex === downlines_id.length - 1
                        ? "btn-unnaked disabledButton"
                        : "btn-unnaked"
                    }
                  >
                    Next
                  </button>
                </Link>

              </div> 
                            
  

          </div>
   
        </div>

          )}
      </div>
      </div>

</>       
      


      
     
    </MainArea>
  );
}
