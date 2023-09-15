import React, { useEffect, useState } from 'react';
import {
  Main,
  Item,
  ItemLeft,
  ItemRight,
  SwapContent,
  MainArea,
} from './styles';
import BNB from '../../assets/images/bnb.png';
import EPX from '../../assets/images/epx.png';
import USDT from '../../assets/images/usdt.svg';
import CountDown from '../CountDown';
import { useTranslation } from 'react-i18next';
import { SelectWrapper } from './styles';
import { Select } from '../Shared/Select';
import { Option } from '../Shared/Select/styles';
import { ethers } from 'ethers';
import zmzabi from '../../abis/ZMZ_Sell.json';
import usdt from '../../abis/USDT_token.json';
import { ToastContainer, toast } from 'react-toastify';
import bigInt from 'big-integer';
import BigNumber from 'big-number';
import { useCustomWallet } from '../../contexts/WalletContext'

const ZMZ_CONTRACT_ADDRESS = '0x37f014bc08e6aaDB4506dd5897700DF317cA132B';
const USDT_TETHER_TOKEN_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
export default function LevelsArea() {
  const { wallet, connectWallet, connectWalletByConfig  } = useCustomWallet();


  const { t } = useTranslation();


  const [userInputValue, setUserInputValue] = useState('0');
  const [estimateValue, setEstimateValue] = useState('');
  const [buttonStatus, setButtonStatus] = useState('approve');

  const handleConnectWallet = async () => {
    try {
      if(!wallet.address){
         await connectWallet('walletconnect');
      }
  
  } catch (error) {
    console.log(error);
  }
  };

  useEffect(() => {
    handleConnectWallet();
  }, []);

  const ZmzContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ZmzContract = new ethers.Contract(
        ZMZ_CONTRACT_ADDRESS,
        zmzabi,
        signer
      );
      return ZmzContract;
    } catch (error) {
      console.log(error);
    }
  };

  const UsdtContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const UsdtContract = new ethers.Contract(
        USDT_TETHER_TOKEN_ADDRESS,
        usdt,
        signer
      );
      return UsdtContract;
    } catch (error) {
      console.log(error);
    }
  };

  const handleEstimate = async (val) => {

    if (!wallet.address) {

      setEstimateValue(val * 0.2)
      setUserInputValue(val);

      return null;
    }

    let _ZmzContract = await ZmzContract();
    setUserInputValue(val);
    if (!val) {
      setEstimateValue('0');
    }
    if (val > 0) {
      let _getEstimate = await _ZmzContract.estimateWithUsdt(
        ethers.utils.parseEther(val)
      );
      setEstimateValue((_getEstimate.toString() / 10 ** 18).toFixed(2));
    }
  };


  const handleEstimateZIMAX = async (val) => {
    try {


      let zimaxValnew = ((5) * (val)).toFixed(6);
      setUserInputValue(zimaxValnew.toString());
      let _ZmzContract = await ZmzContract();
      setEstimateValue(val);
      if (val > 0) {
        let _val = val * 10 ** 5
        let _getEstimate = await _ZmzContract.estimateWithUsdt(
          _val
        );
        let zimaxVal = ((5) * (val)).toFixed(6);
        setUserInputValue(zimaxVal.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleApproveUSDT = async () => {
    try {
      let _UsdtContract = await UsdtContract();
      let _approve = await _UsdtContract.approve(
        ZMZ_CONTRACT_ADDRESS,
        (estimateValue * 10 ** 18).toFixed(0)
      );
      let waitForTx = await _approve.wait();
      if (waitForTx) {
        setButtonStatus('buy');
        toast.success('Approved successfull.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuyUsdt = async () => {
    console.log('userinput', userInputValue);

    try {
      let _ZmzContract = await ZmzContract();

      if (userInputValue <= 0) {
        return toast.error('Value should be positive.');
      }
      let zimaxVal = (userInputValue) * (10 ** 5);
      let _buy = await _ZmzContract.buyWithUsdt(
        zimaxVal, "0x5ECE92Ec0750D556C872f5eE9356dA68A5760A7d"
      );
      let waitForTx = await _buy.wait();
      if (waitForTx) {
        toast.success('Transaction successfull.');
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <SwapContent>
        <h2>
          {t('Buy Zimax and earn up to 30% AR')} <br />
        </h2>
        <h1>
          {' '}
          {t('Next Rewards in')} <CountDown />{' '}
        </h1>
        <p>
          {t(
            'Simply buy, hold and watch your ZiMax in your wallet grow every 15 minutes.'
          )}
        </p>
      </SwapContent>
      <MainArea>
        <Main>
          <Item>
            <ItemLeft>
              <img src={USDT} alt='usdt' />
              {t('USDT')}
            </ItemLeft>
            <ItemRight>
              <input
                placeholder='0'
                type='number'
                value={estimateValue}
                onChange={(e) => handleEstimateZIMAX(e.target.value)}
              />

            </ItemRight>
          </Item>
          <Item>
            <ItemLeft>
              <img src={EPX} alt='ZiMax Token' />
              {t('ZIMAX')}
            </ItemLeft>
            <ItemRight>
              <input
                placeholder='0'
                type='number'
                value={userInputValue}
                onChange={(e) => handleEstimate(e.target.value)}
              />

            </ItemRight>
          </Item>
          <h3 >
            <h3>
              {t('1 ZIMAX = 0.2 USDT')}
            </h3>
            <h3>

            </h3>
          </h3>
          <>
            {buttonStatus === 'approve' ? (
              <button onClick={handleApproveUSDT}>{t('APPROVE')}</button>
            ) : (
              <button onClick={handleBuyUsdt}>{t('BUY')}</button>
            )}
          </>

        </Main>
      </MainArea>
    </>
  );
}
