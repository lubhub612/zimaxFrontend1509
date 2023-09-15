import CountUp from 'react-countup';
import Countdown from 'react-countdown';
import { useState, useEffect } from 'react';
import {
  HeroArea,
  TicketNow,
  TicketWallet,
  TicketFinished,
  PlayArea,
  BuyTicket,
  ConnectWallets,
  NumberContainer,
  ButtonContainer,
  Number,
  Container,
} from './styles';
import badgeTicket from '../../assets/ticket-badge.svg';
import star1 from '../../assets/star-small.png';
import star2 from '../../assets/star-big.png';
import star3 from '../../assets/ticket-l.png';
import star4 from '../../assets/three-stars.png';
import star5 from '../../assets/ticket-r.png';
import num3 from '../../assets/number/3.svg';
import num9 from '../../assets/number/9.svg';
import num8 from '../../assets/number/8.svg';
import num5 from '../../assets/number/5.svg';
import num6 from '../../assets/number/6.svg';
import num7 from '../../assets/number/7.svg';
import chat1 from '../../assets/chat1.png';
import chat2 from '../../assets/chat2.png';
import zmzabi from '../../abis/ZMZ_token_mainnet.json';
import lotteryabi from '../../abis/Lottery_mainnet.json';
import MainModal from '../../components/Shared/MainModal';
import { ConnectWalletForm } from '../../components/Shared/ConnectWalletForm';
import { useCustomWallet } from '../../contexts/WalletContext';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import bigInt from 'big-integer';
import BigNumber from 'big-number';



const ZMZ_CONTRACT_ADDRESS = '0xA080dCB3350d99320Bf67A997D7f876284727ec7';
const ZMZ_LOTTERY_CONTRACT_ADDRESS = '0x9E3c8ECeE958Eb8A5A5b871792840CCb3BdB5CC5';

export default function DefiLottery() {
  const renderer = ({ hours, minutes }) => {
    return (
      <span className="hoursTimes">
        {hours}H &nbsp;
        {minutes}M
      </span>
    );
  };

  const [lotteryDetails, setLotteryDetails] = useState(false);
  const [lotteryDetails2, setLotteryDetails2] = useState(false);
  const [lotteryDetails21, setLotteryDetails21] = useState(false);
  const [lotteryDetails3, setLotteryDetails3] = useState(false);
  const [lotteryDetails31, setLotteryDetails31] = useState(false);
  const [lotteryDetails4, setLotteryDetails4] = useState(false);
  const [lotteryDetails5, setLotteryDetails5] = useState(false);
  const [lotteryDetails6, setLotteryDetails6] = useState(false);
  const [lotteryRound, setLotteryRound] = useState(false);
  const [buyTicketBox, setBuyTicketBox] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [lotteryValue, setLotteryValue] = useState('');
  const [buttonStatus, setButtonStatus] = useState('approve');
  const [number, setNumber] = useState(100);
  const [eidtLotteryNumber, setEidtLotteryNumber] = useState([]);
  const [percent, setPercent] = useState(0);
  const [valueInput, setInputValue] = useState(1);
  const [costValue, setCostValue] = useState(0);
  const [actualCost, setActualCost] = useState('0');
  const [lotteryNumber, setLotteryNumbers] = useState([]);
  const [lotteryEndTime, setLotteryEndTime] = useState(0);
  const [finalNumber, setFinalNumber] = useState(0);
  const [winnerNumber, setWinnerNumber] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [lotteryStartTime, setLotteryStartTime] = useState(0);
  const [lotteryID, setLotteryID] = useState(0);
  const [inputField, setInputField] = useState(0);
  const [winnerCount, setWinnerCount] = useState(0);
  const [countForBracket, setCountForBracket] = useState([]);
  const [ticketIdsForClaim, setTicketIdsForClaim] = useState([]);
  const [boolTicketIdsForClaim, setBoolTicketIdsForClaim] = useState([]);
  const [lotteryTicketLength, setTotalTicketsLength] = useState(0);
  const [lotteryWinnerNumber, setLotteryWinnerNumbers] = useState([]);
  const [totalReward, setTotalReward] = useState(0);
  const [lotteryCurrentID, setLotteryCurrentID] = useState(0);
  const [lotteryRoundNumber, setLotteryRoundNumbers] = useState([]);
  const [lotteryRoundTicketLength, setTotalRoundTicketsLength] = useState(0);
  const [costUSDValue, setCostUSDValue] = useState(0);
  const [rewardsBreakdown, setRewardsBreakdown] = useState([]);
  const [countWinnersPerBracket, setCountWinnersPerBracket] = useState([]);
  const [rewardsLessTreasuryFee, setRewardsLessTreasuryFee] = useState(0);
  const [zmxToBurn, setZmxToBurn] = useState(0);
  const [rewardBrackets, setRewardBrackets] = useState([]);
  const [rewardsBreakdownRound, setRewardsBreakdownRound] = useState([]);
  const [countWinnersPerBracketRound, setCountWinnersPerBracketRound] =
    useState([]);
  const [rewardsLessTreasuryFeeRound, setRewardsLessTreasuryFeeRound] =
    useState(0);
  const [zmxToBurnRound, setZmxToBurnRound] = useState(0);
  const [rewardBracketsRound, setRewardBracketsRound] = useState([]);
  const [amountRound, setRoundAmount] = useState(0.0);
  const [lotteryRounPersonaldNumber, setLotteryRoundPersonalNumbers] = useState(
    []
  );
  const [lotteryRoundPersonalTicketLength, setTotalRoundPersonalTicketsLength] =
    useState(0);

  const [currentLotteryID, setCurrentLotteryID] = useState(0);  

  const { wallet } = useCustomWallet();

  const { t } = useTranslation();

  const handleConnectWallet = () => {
    setIsMenu(false);
    setShowConnectWallet(true);
    setBuyTicketBox(false);
  };

  const toggleBuyTicketBox = () => {
    setBuyTicketBox(!buyTicketBox);
  };
  const toggleRound = () => {
    setLotteryRound(!lotteryRound);
  };

  const toggleRound1 = () => {
    setLotteryRound(!lotteryRound);
    
  };

  const toggleDetails = () => {
    setLotteryDetails(!lotteryDetails);
    handleLottery();
  };

  const toggleDetails2 = () => {
    setLotteryDetails2(!lotteryDetails2);
    handleLottery();
    setLotteryDetails3(false);
  };

  const toggleDetails3 = () => {
    setLotteryDetails3(!lotteryDetails3);
    getReward();
  };

  const toggleDetails31 = () => {
    setLotteryDetails31(!lotteryDetails31);
    getReward();
  };
  const toggleDetails4 = () => {
    setLotteryDetails4(!lotteryDetails4);
    handleLottery();
    setLotteryDetails31(false);
  };

  const toggleDetails5 = () => {
    setLotteryDetails5(!lotteryDetails5);
    handlePrizePool();
  };

  const toggleDetails21 = () => {
    setLotteryDetails21(!lotteryDetails21);
    handlePrizePoolRound();
  };

  const toggleViewTicketBox = () => {
    setLotteryDetails6(!lotteryDetails6);
    handleRoundLottery();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  const formattedDate = time.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const maxNumber = async (value) => {
    setInputValue(value);
  };

  const decreaseNumber = () => {
    if (valueInput > 1) {
      setInputValue(valueInput - 1);
    }
  };
  const increaseNumber = () => {
    if (valueInput <= 99) {
      setInputValue(valueInput + 1);
    }
  };

  useEffect(() => {
    handleLotteryInfo();
    GetRound();
    handleRoundLotteryTicket();
  }, []);

  setTimeout(() => {
    handleEndTime();
  }, 10000);

  setTimeout(() => {
    handleRoundLotteryTicket();
  }, 300000);

  const random = () => {
    let randomNumber = 100000 + Math.floor(Math.random() * 900000);
    randomNumber = 1000000 + randomNumber;
    return randomNumber;
  };

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

  const ZmzLotteryContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ZmzLotteryContract = new ethers.Contract(
        ZMZ_LOTTERY_CONTRACT_ADDRESS,
        lotteryabi,
        signer
      );
      return ZmzLotteryContract;
    } catch (error) {
      console.log(error);
    }
  };

  const GetRound = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      setLotteryCurrentID(id * 1);
      setCurrentLotteryID(id*1);
      const values = await _ZmzLotteryContract.viewLottery(id);

      if (values.status == 1) {
        setInputField(id - 1);
        handleLotery(id - 1);
      } else {
        setInputField(id);
        handleLotery(id);
      }
    } catch (error) {
      console.log('error while getting Round');
    }
  };

  const handleMinus = () => {
    if (inputField > 0) {
      setInputField(inputField - 1);
      handleLotery(inputField - 1);
    }
  };

  const handlePlus = async () => {
    if (inputField > 999) {
      setInputField(999);
      handleLotery(999);
    } else {
      setInputField(inputField * 1 + 1);
      handleLotery(inputField * 1 + 1);
    }
  };
  const handleLotteryOnChange = (e) => {
    if (e.target.value >= 0) {
      setInputField(e.target.value);
      handleLotery(e.target.value);
    } else {
      handleLotery(0);
    }
  };

  const firstLotteryId = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);

      if (id > 1) {
        setInputField(1);
        handleLotery(1);
      } else {
        handleLotery(0);
        setInputField(0);
      }
    } catch (error) {
      console.log('error while getting Round');
    }
  };
  const lastLotteryId = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);
      if (values.status == 1) {
        setInputField(id - 1);
        handleLotery(id - 1);
      } else {
        setInputField(id);
        handleLotery(id);
      }
    } catch (error) {
      console.log('error while getting Round');
    }
  };

  const attachZero = (num) => {
    return ('00' + num).slice(-3);
  };

  const attachZeroNum = (num, index) => {
    return ('00' + num).slice(-index);
  };

  const removeOneNum = (num) => {
    return ('0' + num).slice(2);
  };

  const handleEndTime = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      let lotteryEndTime = await _ZmzLotteryContract.getTime(id);
      setLotteryEndTime(lotteryEndTime * 1);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLotteryInfo = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);

      if (values.status == 1) {
        handleLotery(id - 1);
      } else {
        handleLotery(id);
      }
    } catch (error) {
      console.log('error ', error);
    }
  };

  function reversedNum(num) {
    return (
      parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num)
    );
  }

  const handleLotery = async (id) => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const lotteryID = await _ZmzLotteryContract.viewCurrentLotteryId();
      if (id > lotteryID) {
        toast.error('Input ID exceeded currently Max Lottery No');
      } else if (id == lotteryID) {
        toast.info('Lottery Result is yet to draw');
      } else {
        let lotteryInfo = await _ZmzLotteryContract.viewLottery(id);
        let date2 = new Date(lotteryInfo.startTime * 1000);
        let formattedDate2 = date2.toLocaleString();
        setLotteryID(id * 1);
        setLotteryStartTime(formattedDate2);
        let finalNumber = lotteryInfo.finalNumber;
        finalNumber = finalNumber % 1000000;
        let num = reversedNum(finalNumber);
        if (num.toString().length == 6) {
          num = num.toString();
        } else if (num.toString().length == 5) {
          num = '0' + num.toString();
        } else if (num.toString().length == 4) {
          num = '00' + num.toString();
        } else if (num.toString().length == 3) {
          num = '000' + num.toString();
        } else if (num.toString().length == 2) {
          num = '0000' + num.toString();
        } else if (num.toString().length == 1) {
          num = '00000' + num.toString();
        } else {
          num = '000000' + num.toString();
        }

        setWinnerNumber(num);
        setAmount(lotteryInfo.amountCollectedInZMX * 0.000001);
      }
    } catch (error) {
      console.log('error while setting lottery');
    }
  };

  const handleLottery = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      let lotteryInfo = await _ZmzLotteryContract.viewUserInfoForLotteryId(
        wallet.address,
        inputField,
        0,
        100
      );

      setTotalTicketsLength(lotteryInfo[3] * 1);

      let array = [...lotteryInfo[1]];
      let newArray = array.map((item) => {
        item = reversedNum(item % 1000000);
        if (item.toString().length == 6) {
          item = item.toString();
        } else if (item.toString().length == 5) {
          item = '0' + item.toString();
        } else if (item.toString().length == 4) {
          item = '00' + item.toString();
        } else if (item.toString().length == 3) {
          item = '000' + item.toString();
        } else if (item.toString().length == 2) {
          item = '0000' + item.toString();
        } else if (item.toString().length == 1) {
          item = '00000' + item.toString();
        } else {
          item = '000000' + item.toString();
        }
        return item;
      });

      setLotteryWinnerNumbers(newArray);

      let num = winnerNumber;
      num = num.toString().split('');
      let totalLotteryWinnerNumber = 0;
      let countArray = [];
      let ticketIDs = [];
      let boolForTicketIds = [];
      newArray.map((item, index) => {
        let count = 1;
        let bool = true;
        let splitted = item.toString().split('');

        for (let i = 0; i < num.length; i++) {
          if (splitted[i] == num[i] && count > i) {
            count++;
            if (bool == true) {
              totalLotteryWinnerNumber++;
              bool = false;
              ticketIDs.push(lotteryInfo[0][index]);
              boolForTicketIds.push(lotteryInfo[2][index]);
            }
          }
        }
        if (count > 1) {
          countArray.push(count - 2);
        }

        setTicketIdsForClaim(ticketIDs);
        setCountForBracket(countArray);
        setBoolTicketIdsForClaim(boolForTicketIds);
        setWinnerCount(totalLotteryWinnerNumber);
      });
    } catch (error) {
      console.log('error while setting lottery');
    }
  };

  const handleLotteryRound = async (id) => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const lotteryID = await _ZmzLotteryContract.viewCurrentLotteryId();
      if (id > lotteryID) {
        toast.error('Input ID exceeded currently Max Lottery No');
      } else if (id == lotteryID) {
        toast.info('Lottery Result is yet to anounce');
      } else {
        let lotteryInfo = await _ZmzLotteryContract.viewUserInfoForLotteryId(
          wallet.address,
          id,
          0,
          100
        );
        setTotalTicketsLength(lotteryInfo[3] * 1);

        let array = [...lotteryInfo[1]];
        let newArray = array.map((item) => {
          item = reversedNum(item % 1000000);
          if (item.toString().length == 6) {
            item = item.toString();
          } else if (item.toString().length == 5) {
            item = '0' + item.toString();
          } else if (item.toString().length == 4) {
            item = '00' + item.toString();
          } else if (item.toString().length == 3) {
            item = '000' + item.toString();
          } else if (item.toString().length == 2) {
            item = '0000' + item.toString();
          } else if (item.toString().length == 1) {
            item = '00000' + item.toString();
          } else {
            item = '000000' + item.toString();
          }
          return item;
        });

        setLotteryWinnerNumbers(newArray);

        let num = winnerNumber;
        num = num.toString().split('');
        let totalLotteryWinnerNumber = 0;
        let countArray = [];
        let ticketIDs = [];
        let boolForTicketIds = [];
        newArray.map((item, index) => {
          let count = 1;
          let bool = true;
          let splitted = item.toString().split('');

          for (let i = 0; i < num.length; i++) {
            if (splitted[i] == num[i] && count > i) {
              count++;
              if (bool == true) {
                totalLotteryWinnerNumber++;
                bool = false;
                ticketIDs.push(lotteryInfo[0][index]);
                boolForTicketIds.push(lotteryInfo[2][index]);
              }
            }
          }
          if (count > 1) {
            countArray.push(count - 2);
          }

          setTicketIdsForClaim(ticketIDs);
          setCountForBracket(countArray);
          setBoolTicketIdsForClaim(boolForTicketIds);

          setWinnerCount(totalLotteryWinnerNumber);
        });
      }
    } catch (error) {
      console.log('error while setting lottery');
    }
  };

  const handleRoundLottery = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const lotteryID = await _ZmzLotteryContract.viewCurrentLotteryId();
      let lotteryInfo = await _ZmzLotteryContract.viewUserInfoForLotteryId(
        wallet.address,
        lotteryID,
        0,
        100
      );

      let array = [...lotteryInfo[1]];
      setTotalRoundTicketsLength(lotteryInfo[3] * 1);
      setLotteryRoundNumbers(array);
    } catch (error) {
      console.log('error while setting lottery');
    }
  };

  const handleRoundLotteryTicket = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const lotteryID = await _ZmzLotteryContract.viewCurrentLotteryId();
      let lotteryInfo = await _ZmzLotteryContract.viewUserInfoForLotteryId(
        wallet.address,
        lotteryID,
        0,
        100
      );

      let array = [...lotteryInfo[1]];
      setTotalRoundPersonalTicketsLength(lotteryInfo[3] * 1);
      setLotteryRoundPersonalNumbers(array);
    } catch (error) {
      console.log('error while setting lottery');
    }
  };

  const handlePrizePool = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);
      const rewardBrackets = [0, 1, 2, 3, 4, 5];
      setRewardBrackets(rewardBrackets);
      const feeAsPercentage = values.treasuryFee / 100;
      const amountCollectedInZMX = values.amountCollectedInZMX / 10 ** 5;
      const zmxToBurn1 = feeAsPercentage * amountCollectedInZMX;
      const zmxToBurn = zmxToBurn1 / 100;
      const amountLessTreasuryFee = amountCollectedInZMX - zmxToBurn;
      setRewardsBreakdown(values.rewardsBreakdown);
      setCountWinnersPerBracket(values.countWinnersPerBracket);
      setRewardsLessTreasuryFee(amountLessTreasuryFee);
      setZmxToBurn(zmxToBurn);
    } catch (error) {
      console.log('error while getting Round');
      console.log(error);
    }
  };

  const handlePrizePoolRound = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      const lotteryID = await _ZmzLotteryContract.viewCurrentLotteryId();
      if (inputField > lotteryID) {
        toast.error('Input ID exceeded currently Max Lottery No');
      } else if (inputField == lotteryID) {
        toast.info('Lottery Result is yet to draw');
      } else {
        const values = await _ZmzLotteryContract.viewLottery(inputField);
        const rewardBrackets = [0, 1, 2, 3, 4, 5];
        setRewardBracketsRound(rewardBrackets);
        const feeAsPercentage = values.treasuryFee / 100;
        const amountCollectedInZMX = values.amountCollectedInZMX / 10 ** 5;
        const zmxToBurn1 = feeAsPercentage * amountCollectedInZMX;
        const zmxToBurn = zmxToBurn1 / 100;
        const amountLessTreasuryFee = amountCollectedInZMX - zmxToBurn;
        setRewardsBreakdownRound(values.rewardsBreakdown);
        setRewardsLessTreasuryFeeRound(amountLessTreasuryFee);
        setZmxToBurnRound(zmxToBurn);
        setRoundAmount(values.amountCollectedInZMX * 0.000001);
        let array = [];
        for (let i = 0; i < rewardBrackets.length; i++) {
          let num = values.countWinnersPerBracket[i]._hex * 1;
          array = [...array, num];
        }

        setCountWinnersPerBracketRound(array);
      }
    } catch (error) {
      console.log('error while getting Round');
      console.log(error);
    }
  };

  const handleLotteryZIMAX = async (val) => {
    try {
      setInputValue(val);
      getTicketCost(val);
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketCost = async (valZMX) => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();

      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);

      if (valZMX == 0) {
        setPercent(0);
      } else {
        let costForOne =
          await _ZmzLotteryContract.calculateTotalPriceForBulkTickets(
            values.discountDivisor,
            values.priceTicketInZMX,
            1
          );

        costForOne = costForOne.toString() / 10 ** 5;
        let val = costForOne * 1;
        setCostValue(val);
        setCostUSDValue(val * valZMX);

        let acutalCostForBuy =
          await _ZmzLotteryContract.calculateTotalPriceForBulkTickets(
            values.discountDivisor,
            values.priceTicketInZMX,
            valZMX
          );

        acutalCostForBuy = acutalCostForBuy.toString() / 10 ** 5;
        acutalCostForBuy = parseFloat(acutalCostForBuy).toFixed(4);
        setActualCost(acutalCostForBuy);

        let percentage = values.discountDivisor / 10000;
        percentage = parseFloat(percentage).toFixed(2);
        percentage = (percentage * valZMX).toFixed(2);

        setPercent(percentage);
      }
    } catch (error) {
      console.log('error while getting zimax balance', error);
    }
  };

  const getCost = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();

      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);

      if (valueInput == 0) {
        setPercent(0);
      } else {
        let costForOne =
          await _ZmzLotteryContract.calculateTotalPriceForBulkTickets(
            values.discountDivisor,
            values.priceTicketInZMX,
            1
          );

        costForOne = costForOne.toString() / 10 ** 5;
        let val = costForOne * 1;
        setCostValue(val);
        setCostUSDValue(val * valueInput);

        let acutalCostForBuy =
          await _ZmzLotteryContract.calculateTotalPriceForBulkTickets(
            values.discountDivisor,
            values.priceTicketInZMX,
            valueInput
          );

        acutalCostForBuy = acutalCostForBuy.toString() / 10 ** 5;
        acutalCostForBuy = parseFloat(acutalCostForBuy).toFixed(4);
        setActualCost(acutalCostForBuy);

        let percentage = values.discountDivisor / 10000;
        percentage = parseFloat(percentage).toFixed(2);
        percentage = (percentage * valueInput).toFixed(2);

        setPercent(percentage);
      }
    } catch (error) {
      console.log('error while getting zimax balance', error);
    }
  };

  const getReward = async () => {
    let ids = ticketIdsForClaim;
    let reward = 0;

    ids.map(async (item, index) => {
      let _ZmzLotteryContract = await ZmzLotteryContract();

      let rewardInfo = await _ZmzLotteryContract.viewRewardsForTicketId(
        lotteryID,
        item,
        countForBracket[index]
      );
      reward = parseFloat(reward) + parseFloat(rewardInfo / 10 ** 5);
      reward = reward.toFixed(4);
      setTotalReward(reward);
    });
  };
  const claimReward = async () => {
    let tickets = ticketIdsForClaim.map((item) => {
      return item * 1;
    });

    let res;
    boolTicketIdsForClaim.map((item) => {
      if (item == true) {
        res = true;
      } else {
        res = false;
      }
    });

    try {
      if (res != true) {
        let _ZmzLotteryContract = await ZmzLotteryContract();

        let _buy = await _ZmzLotteryContract.claimTickets(
          lotteryID,
          tickets,
          countForBracket
        );
        let waitForTx = await _buy.wait();
        if (waitForTx) {
          toast.success('You claim reward ');
        }
      } else {
        toast.info('You already claimed the Reward');
      }
    } catch (error) {
      toast.error('Transaction Failed');
    }
  };

  const getRewardText = (val) => {
    const numberMatch = val + 1;

    if (val === 5) {
      return <strong>Match all {numberMatch}</strong>;
    }
    return <strong>Match first {numberMatch}</strong>;
  };

  const getZmxRewards = (bracket) => {
    const shareAsPercentage = rewardsBreakdown[bracket] / 100;
    const rewards = rewardsLessTreasuryFee * shareAsPercentage;
    const rewardsZmx = rewards / 100;
    return <CountUp end={rewardsZmx} />;
  };

  const getZmxRewardsUSD = (bracket) => {
    const shareAsPercentage = rewardsBreakdown[bracket] / 100;
    const rewards = rewardsLessTreasuryFee * shareAsPercentage;
    const rewardsZmx = rewards / 100;
    const rewardsUSD = rewardsZmx * 5;
    return <CountUp end={rewardsUSD} />;
  };

  const getRewardTextRound = (val) => {
    const numberMatch = val + 1;

    if (val === 5) {
      return <strong>Match all {numberMatch}</strong>;
    }
    return <strong>Match first {numberMatch}</strong>;
  };

  const getZmxRewardsRound = (bracket) => {
    const shareAsPercentage = rewardsBreakdownRound[bracket] / 100;
    const rewards = rewardsLessTreasuryFeeRound * shareAsPercentage;
    const rewardsZmx = rewards / 100;
    return <CountUp end={rewardsZmx} />;
  };

  const getZmxRewardsUSDRound = (bracket) => {
    const shareAsPercentage = rewardsBreakdownRound[bracket] / 100;
    const rewards = rewardsLessTreasuryFeeRound * shareAsPercentage;
    const rewardsZmx = rewards / 100;
    const rewardsUSD = rewardsZmx * 5;
    return <CountUp end={rewardsUSD} />;
  };

  const getZmxRewardsRoundWinner = (bracket) => {
    const shareAsPercentage = rewardsBreakdownRound[bracket] / 100;
    const rewards = rewardsLessTreasuryFeeRound * shareAsPercentage;
    const rewardsZmx = rewards / 100;
    let zmxWinnerEach;
    if (countWinnersPerBracketRound[bracket] !== 0) {
      let zmxEach = rewardsZmx / countWinnersPerBracketRound[bracket];
      zmxWinnerEach = zmxEach.toFixed(4);
    } else {
      zmxWinnerEach = 0;
    }

    return zmxWinnerEach;
  };

  const handleApproveZMZ = async () => {
    try {
      let _ZmzContract = await ZmzContract();

      let _approve = await _ZmzContract.approve(
        ZMZ_LOTTERY_CONTRACT_ADDRESS,
        ethers.utils.parseEther(actualCost.toString())
      );
      let waitForTx = await _approve.wait();
      if (waitForTx) {
        setButtonStatus('buy');
        toast.success('Approved successfull.');
        let array = [];
        for (let i = 1; i <= valueInput; i++) {
          let num = random();
          array = [...array, num];
        }
        setLotteryNumbers(array);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuyZMX = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      if (valueInput <= 0) {
        return toast.error('Value should be positive.');
      }
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();

      let array = [];
      for (let i = 1; i <= valueInput; i++) {
        let num = random();
        array = [...array, num];
      }
      setLotteryNumbers(array);
      let _buy = await _ZmzLotteryContract.buyTickets(id, array);
      let waitForTx = await _buy.wait();
      if (waitForTx) {
        toast.success('Transaction successfull.');
        setBuyTicketBox(false);
      } else {
        toast.error('execution reverted');
        setBuyTicketBox(false);
      }
    } catch (error) {
      toast.error('execution reverted');
      setBuyTicketBox(false);
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      {showConnectWallet && (
        <MainModal
          title={'My Wallet'}
          handleClose={() => setShowConnectWallet(false)}
        >
          <ConnectWalletForm
            goToSignIn={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
            handleClose={() => setShowConnectWallet(false)}
          />
        </MainModal>
      )}
      {buyTicketBox && (
        <BuyTicket>
          <div className="buyTicketInner">
            <h2>
              Buy Tickets
              <svg
                onClick={toggleBuyTicketBox}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </h2>
            <h3>
              Buy:
              <strong>
                Tickets <img src={star5} alt="" />
              </strong>
            </h3>
            <div className="buyBmax">
              <input
                type="text"
                pattern="\d*"
                placeholder="0000"
                maxLength={3}
                value={valueInput}
                onChange={(e) => handleLotteryZIMAX(e.target.value)}
              />
              <p>{costUSDValue} ZMX </p>
            </div>
            <h3>
              Cost (ZMX) <span>{costValue} ZMX</span>
            </h3>
            <h3>
              Bulk discount
              <span>{percent}% </span>
            </h3>
            <h4>
              You pay
              <strong>{actualCost}ZMX</strong>
            </h4>
            {window.web3 ? (
              <>
                {buttonStatus === 'approve' ? (
                  <button onClick={handleApproveZMZ}>{t('APPROVE')}</button>
                ) : (
                  <button onClick={handleBuyZMX}>{t('BUY TICKETS')}</button>
                )}
              </>
            ) : (
              <ConnectWallets onClick={handleConnectWallet}>
                <button>{t('Connect wallet')}</button>
              </ConnectWallets>
            )}
            <NumberContainer>
              {lotteryNumber &&
                lotteryNumber.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    pattern="\d*"
                    maxLength={7}
                    placeholder="123456"
                    className="input"
                    value={item}
                  />
                ))}
            </NumberContainer>
            <h5>
              "Buy Instantly" chooses random numbers, with no duplicates among
              your tickets. Prices are set before each round starts, equal to $5
              at that time. Purchases are final.
            </h5>
          </div>
        </BuyTicket>
      )}

      <HeroArea>
        <h2>The ZiMaxLottery</h2>
        <h3>
          $<CountUp end={83894} />
        </h3>
        <h4>in prizes!</h4>
        <img
          src={badgeTicket}
          onClick={toggleBuyTicketBox}
          className="badgeTicket"
          alt="badgeTicket"
        />
        <ul>
          <li>
            <img src={star1} alt="star1" />
          </li>
          <li>
            <img src={star2} alt="star1" />
          </li>
          <li>
            <img src={star3} alt="star1" />
          </li>
          <li>
            <img src={star4} alt="star1" />
          </li>
          <li>
            <img src={star5} alt="star1" />
          </li>
        </ul>
      </HeroArea>
      <TicketNow>
        <h2>Get your tickets now!</h2>
        <p className="ticketClock">
          {lotteryEndTime !== 0 ? (
            <Countdown
              date={Date.now() + 60000 * lotteryEndTime}
              renderer={renderer}
            />
          ) : (
            <span style={{ color: '#fdc122', fontWeight: 700, fontSize: 32 }}>
              00h : 00m
            </span>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp; until the draw
        </p>
        <div className="ticketMainArea">
          <div className="ticketHeading">
            Next Draw <span>#{currentLotteryID} </span>
          </div>
          <div className="ticketBody">
            <h2>
              <span>Prize Pot</span>
              <strong>{amount.toFixed(2)} ZMX</strong>
            </h2>
            <h2>
              <span>Your Tickets</span>
              <strong>
                You Bought {lotteryRoundPersonalTicketLength} tickets
              </strong>
              
              {lotteryRoundPersonalTicketLength !== 0 ? (
                <button onClick={toggleViewTicketBox}>View Tickets</button>
              ) : (
                ''
              )}
              {lotteryEndTime !== 0 ? (
                <button onClick={toggleBuyTicketBox}>Buy Tickets</button>
              ) : (
                ''
              )}
            </h2>
          </div>
          <div className="ticketFooter">
            {lotteryDetails5 ? (
              <div className="ticket-footer-details">
                <p>
                  Match the winning number in the same order to share prizes.
                  Current prizes up for grabs:
                </p>
                <ul>
                  {rewardBrackets &&
                    rewardBrackets.map((item, index) => (
                      <>
                        <li>
                          {getRewardText(item)}
                          <p>{getZmxRewards(item)} ZMX</p>
                        </li>
                      </>
                    ))}
                  <li>
                    <strong className="red-burn">Burn</strong>
                    <p>
                      <CountUp end={zmxToBurn} /> ZMX
                    </p>
                    <span></span>
                  </li>
                </ul>
              </div>
            ) : (
              ''
            )}

            {lotteryDetails6 ? (
              <div className="ticket-footer-details">
                <NumberContainer>
                  <p style={{ display: 'flex' }}>YOUR TICKETS:</p>
                  <p
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                    mb="3px"
                  >
                    <span style={{ paddingLeft: 20 }}>💸 Total tickets:</span>
                    <span>{lotteryRoundTicketLength}</span>
                  </p>
                  {lotteryRoundNumber &&
                    lotteryRoundNumber.map((item, index) => (
                      <div>
                        <p style={{ fontSize: 12, margin: 0 }}>
                          #{attachZeroNum(index + 1, 3)}
                        </p>
                        <p id="input">{removeOneNum(item)}</p>
                      </div>
                    ))}
                </NumberContainer>
              </div>
            ) : (
              ''
            )}

            <button>
              {lotteryDetails5 ? (
                <div onClick={toggleDetails5}>
                  Hide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                    />
                  </svg>
                </div>
              ) : (
                <div onClick={toggleDetails5}>
                  Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
      </TicketNow>
      <TicketWallet>
        {window.web3 ? (
          inputField >= lotteryCurrentID ? (
            <>
              <button
                onClick={() =>
                  toast.info('Oops!  Winning Number yet to publish')
                }
              >
                CLAIM PRIZES
              </button>
              <ul>
                <li>
                  <img src="/static/media/ticket-l.7506225c.png" alt="star1" />
                </li>
                <li>
                  <img src="/static/media/ticket-r.cbdaa86c.png" alt="star1" />
                </li>
              </ul>
            </>
          ) : (
            <>
              <button onClick={toggleDetails4}>CLAIM PRIZES</button>
              <ul>
                <li>
                  <img src="/static/media/ticket-l.7506225c.png" alt="star1" />
                </li>
                <li>
                  <img src="/static/media/ticket-r.cbdaa86c.png" alt="star1" />
                </li>
              </ul>
            </>
          )
        ) : (
          <>
            <h3>
              Connect your wallet <br /> to check if you've won!
            </h3>
            <ConnectWallets onClick={handleConnectWallet}>
              <button>{t('Connect wallet')}</button>
              <ul>
                <li>
                  <img src="/static/media/ticket-l.7506225c.png" alt="star1" />
                </li>
                <li>
                  <img src="/static/media/ticket-r.cbdaa86c.png" alt="star1" />
                </li>
              </ul>
            </ConnectWallets>
          </>
        )}

        {lotteryDetails4 ? (
          <div className="ticket-footer-details">
            {winnerCount && winnerCount > 0 ? (
              <NumberContainer>
                <p style={{ display: 'flex' }}>YOUR TICKETS:</p>
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  mb="3px"
                >
                  <span style={{ paddingLeft: 220 }}>💸 Total tickets:</span>
                  <span style={{ paddingLeft: 220 }}>
                    {lotteryTicketLength}
                  </span>
                </p>
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  mb="3px"
                >
                  <span style={{ paddingLeft: 220 }}>🎁 Winning tickets:</span>
                  <span style={{ paddingLeft: 220 }}> {winnerCount}</span>
                </p>
                {lotteryWinnerNumber &&
                  lotteryWinnerNumber.map((item, index) => (
                    <div>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                        mb="3px"
                      >
                        <span style={{ paddingLeft: 220 }}>
                          #{attachZeroNum(index + 1, 3)}
                        </span>
                        <span style={{ paddingLeft: 420 }}>{item}</span>
                      </p>
                    </div>
                  ))}

                <span style={{ paddingLeft: 420 }}>
                  <button onClick={toggleDetails31}>Collect Prizes</button>
                </span>
              </NumberContainer>
            ) : (
              <div>
                <p>Are you a winner?</p>

                <p>No prizes to collect... Better luck next time!</p>

                <img
                  src={badgeTicket}
                  onClick={toggleBuyTicketBox}
                  className="badgeTicket"
                  alt="badgeTicket"
                />
              </div>
            )}
          </div>
        ) : (
          ''
        )}

        {lotteryDetails31 ? (
          <div className="ticket-footer-details">
            <p>Collect Winnings</p>
            <p>YOU WON! </p>
            <p
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                fontWeight: '700',
                letterSpacing: 1.4,
              }}
            >
              {totalReward} ZMX!
              <span>🎁</span>
            </p>
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              Round #{lotteryID}
            </p>

            <button onClick={() => claimReward()}>Claim</button>
          </div>
        ) : (
          ''
        )}
      </TicketWallet>
      <TicketFinished>
        <h2>Finished Rounds</h2>
        <div className="ticketFinishedArea">
          <button
            onClick={toggleRound}
            className={!lotteryRound ? 'active' : ''}
          >
            All History
          </button>
          <button
            onClick={toggleRound1}
            className={lotteryRound ? 'active' : ''}
          >
            your history
          </button>
        </div>
        <div className="roundArea">
          {!lotteryRound && (
            <div className="round">
              <div className="round-number-area">
                <h2>
                  Round <span>#{lotteryID}</span>
                </h2>

                <div className="round-number-number">
                  <h4
                    onClick={() => {
                      handleMinus();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-left-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                  </h4>
                  <input
                    type="text"
                    pattern="\d*"
                    placeholder="0000"
                    onChange={(e) => {
                      handleLotteryOnChange(e);
                    }}
                    maxLength={3}
                    value={attachZero(inputField)}
                  />

                  <h4
                    onClick={() => {
                      handlePlus();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </h4>
                </div>
              </div>

              <div className="round-number">
                <h2>
                  Winning Number
                  <span style={{ fontSize: '32px' }}>{winnerNumber}</span>
                </h2>
               
              </div>

              <div className="ticketFooter">
                

                {lotteryDetails21 ? (
                  <div className="ticket-footer-details">
                    <p>
                      Match the winning number in the same order to share
                      prizes.
                    </p>
                    <ul>
                      {rewardBracketsRound &&
                        rewardBracketsRound.map((item, index) => (
                          <>
                            <li>
                              {getRewardTextRound(item)}
                              <p>{getZmxRewardsRound(item)} ZMX</p>
                              <p> {getZmxRewardsRoundWinner(item)} ZMX each </p>
                              <p>
                                {countWinnersPerBracketRound[item]} Winning
                                Tickets
                              </p>
                            </li>
                          </>
                        ))}
                      <li>
                        <strong className="red-burn">Burn</strong>
                        <p>
                          <CountUp end={zmxToBurnRound} /> ZMX
                        </p>
                        <span></span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ''
                )}

                <button>
                  {lotteryDetails21 ? (
                    <div onClick={toggleDetails21}>
                      Hide
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div onClick={toggleDetails21}>
                      Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
          {lotteryRound && (
            <div className="round-history">
              <h2>
                Rounds <span>#{window.web3 ? lotteryID : ''}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </h2>
              <div className="ticket-footer-details">
                Winning Number
                <p style={{ fontSize: '32px' }}> {winnerNumber} </p>
                {window.web3 ? (
                  <>
                    <ButtonContainer>
                      {inputField >= lotteryCurrentID ? (
                        <>
                          <button
                            onClick={() =>
                              toast.info('Oops!  Winning Number yet to publish')
                            }
                          >
                            YOUR TICKETS
                          </button>
                        </>
                      ) : (
                        <button onClick={toggleDetails2}>YOUR TICKETS</button>
                      )}
                    </ButtonContainer>
                    {lotteryDetails2 ? (
                      <div className="ticket-footer-details">
                        <p>
                          Round <strong>{lotteryID}</strong>
                        </p>
                        <p>WINNING NUMBER: </p>
                        {winnerNumber
                          .toString()
                          .split('')
                          .map((item, index) => (
                            <Number key={index}>{item}</Number>
                          ))}
                        <NumberContainer>
                          <p style={{ display: 'flex' }}>YOUR TICKETS:</p>
                          <p
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                            mb="3px"
                          >
                            <span style={{ paddingLeft: 20 }}>
                              💸 Total tickets:
                            </span>
                            <span>{lotteryTicketLength}</span>
                          </p>
                          <p
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                            mb="3px"
                          >
                            <span style={{ paddingLeft: 20 }}>
                              🎁 Winning tickets:
                            </span>
                            <span>{winnerCount}</span>
                          </p>
                          {lotteryWinnerNumber &&
                            lotteryWinnerNumber.map((item, index) => (
                              <div>
                                <p
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                  }}
                                  mb="3px"
                                >
                                  <span style={{ paddingLeft: 20 }}>
                                    #{attachZeroNum(index + 1, 3)}
                                  </span>
                                  <span style={{ paddingLeft: 220 }}>
                                    {item}
                                  </span>
                                </p>
                              </div>
                            ))}
                        </NumberContainer>
                        <ButtonContainer>
                          {winnerCount && winnerCount > 0 ? (
                            <button onClick={toggleDetails3}>
                              Collect Prizes
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                toast.info(
                                  "Oops! you  don't have any winning Ticket"
                                )
                              }
                            >
                              Collect Prizes
                            </button>
                          )}
                        </ButtonContainer>
                      </div>
                    ) : (
                      ''
                    )}

                    {lotteryDetails3 ? (
                      <div className="ticket-footer-details">
                        <p>Collect Winnings</p>
                        <p>YOU WON! </p>
                        <p
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            fontWeight: '700',
                            letterSpacing: 1.4,
                          }}
                        >
                          <span>{totalReward} ZMX!</span>
                          <span>🎁</span>
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                          }}
                        >
                          Round #{lotteryID}
                        </p>

                        <ButtonContainer>
                          <button onClick={() => claimReward()}>Claim</button>
                        </ButtonContainer>
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  
                  <>
                    <p>Connect your wallet to check your history</p>
                    <ConnectWallets onClick={handleConnectWallet}>
                      <button className="ticket-footer-details-button">
                        {t('Connect wallet')}
                      </button>
                    </ConnectWallets>
                  </>
                )}
              </div>
              <div className="round-footer">
                <p>Only showing data for Lottery V2</p>
              </div>
            </div>
          )}
        </div>
      </TicketFinished>
      <PlayArea>
        <h2>How to Play</h2>
        <p>
          If the digits on your tickets match the winning numbers in the correct
          order, you win a portion of the prize pool. Simple!
        </p>
        <ul>
          <li>
            <span>STEP 1</span>
            <h2>Buy Tickets</h2>
            <p>
              Prices are set when the round starts, equal to 5 USD in ZMX per
              ticket.
            </p>
          </li>
          <li>
            <span>STEP 2</span>
            <h2>Wait for the Draw</h2>
            <p>
              There is one draw every day alternating between 0 AM UTC and 12 PM
              UTC.
            </p>
          </li>
          <li>
            <span>STEP 3</span>
            <h2>Check for Prizes</h2>
            <p>
              Once the round’s over, come back to the page and check to see if
              you’ve won!
            </p>
          </li>
        </ul>
        <div className="playDetails">
          <div className="playDetailsLeft">
            <h2>Winning Criteria</h2>
            <h3>
              The digits on your ticket must match in the correct order to win.
            </h3>
            <p>Here’s an example lottery draw, with two tickets, A and B.</p>
            <ul>
              <li>
                Ticket A: The first 3 digits and the last 2 digits match, but
                the 4th digit is wrong, so this ticket only wins a “Match first
                3” prize.
              </li>
              <li>
                Ticket B: Even though the last 5 digits match, the first digit
                is wrong, so this ticket doesn’t win a prize.
              </li>
            </ul>

            <p>
              Prize brackets don’t ‘stack’: if you match the first 3 digits in
              order, you’ll only win prizes from the ‘Match 3’ bracket, and not
              from ‘Match 1’ and ‘Match 2’.
            </p>
          </div>
          <div className="playDetailsRight">
            <img src={chat1} alt="chat" />
          </div>
        </div>
        <div className="playDetails">
          <div className="playDetailsLeft">
            <h2>Prize Funds</h2>
            <p>The prizes for each lottery round come from three sources:</p>
            <h3>Ticket Purchases</h3>
            <ul>
              <li>
                100% of the ZMX paid by people buying tickets that round goes
                back into the prize pools.
              </li>
            </ul>
            <h3>Rollover Prizes</h3>
            <ul>
              <li>
                After every round, if nobody wins in one of the prize brackets,
                the unclaimed ZMX for that bracket rolls over into the next
                round and are redistributed among the prize pools.
              </li>
            </ul>
            <h3>ZMX Injections</h3>
            <ul>
              <li>
                An average total of 35,000 ZMX from the treasury is added to
                lottery rounds over the course of a week. This ZMX is of course
                also included in rollovers! Read more in our guide to ZMX
                Tokenomics
              </li>
            </ul>
          </div>
          <div className="playDetailsRight">
            <img src={chat2} alt="chat" />
          </div>
        </div>
      </PlayArea>
    </>
  );
}
