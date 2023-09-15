import React, { useEffect, useState } from 'react';
import { NftCal, NftGrid, NftTotal } from './styles';
import { useGlobal } from '../../contexts/GlobalContext';

export default function NftCalculator(props) {
  const { invokeServer } = useGlobal();
  const [cost, setCost] = useState([]);
  const [cycle, setCycle] = useState([]);

  const [cost2, setCost2] = useState([]);
  const [cycle2, setCycle2] = useState([]);

  const [cost3, setCost3] = useState([]);
  const [cycle3, setCycle3] = useState([]);


  const [cost4, setCost4] = useState([]);
  const [cycle4, setCycle4] = useState([]);


  const [planData, setPlanData] = useState([]);

  const loadNotification = () => {
    invokeServer(
      "get", `/api/plans/find/1`
    )
    .then((r) => {
      const plans = r.data.msg;
      setPlanData(plans);
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });
  };


  const loadNotification1 = () => {
    invokeServer(
      "get", `/api/plans/check/1`
    )
    .then((r) => {
      const plans = r.data.msg;
      setCost(plans.amount);
      setCycle(plans.amount*3);
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });
  };

  const loadNotification2 = () => {
    invokeServer(
      "get", `/api/plans/check/2`
    )
    .then((r) => {
      const plans = r.data.msg;
      setCost2(plans.amount);
      setCycle2(plans.amount*4);
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });
  };


  const loadNotification3 = () => {
    invokeServer(
      "get", `/api/plans/check/3`
    )
    .then((r) => {
      const plans = r.data.msg;
      setCost3(plans.amount);
      const level1=parseFloat(plans.amount)*3*30/100;
      const level2=parseFloat(plans.amount)*7*70/100;
      const final=level1+level2;
      setCycle3(final.toFixed());
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });
  };


  const loadNotification4 = () => {
    invokeServer(
      "get", `/api/plans/check/4`
    )
    .then((r) => {
      const plans = r.data.msg;
      setCost4(plans.amount);

      const level1=parseFloat(plans.amount)*4*20/100;
      const level2=parseFloat(plans.amount)*8*30/100;
      const level3=parseFloat(plans.amount)*14*50/100;
      const final=level1+level2+level3;
  setCycle4(final);
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });
  };

 

  function handleOne(one, two) {
    const newCost = one;
    const newCycle = two;
    setCost(newCost);
    setCycle(newCycle);
    document.getElementById('costNft').textContent = newCost;
    document.getElementById('cycleNft').textContent = newCycle;
  }

 

  function handleTwo(one, two) {
    const newCost2 = one;
    const newCycle2 = two;
    setCost2(newCost2);
    setCycle2(newCycle2);
    document.getElementById('costNft2').textContent = newCost2;
    document.getElementById('cycleNft2').textContent = newCycle2;
  }



  function handleThree(one, two) {
    const newCost3 = one;
    const newCycle3 = two;
    setCost3(newCost3);
    setCycle3(newCycle3);
    document.getElementById('costNft3').textContent = newCost3;
    document.getElementById('cycleNft3').textContent = newCycle3;
  }

 

  function handleFour(one, two) {
    const newCost4 = one;
    const newCycle4 = two;
    setCost4(newCost4);
    setCycle4(newCycle4);
    document.getElementById('costNft4').textContent = newCost4;
    document.getElementById('cycleNft4').textContent = newCycle4;
  }

  const numberLists = document.querySelectorAll('.number-list');

  numberLists.forEach((numberList) => {
    const numberListItems = numberList.getElementsByTagName('li');

    for (let i = 0; i < numberListItems.length; i++) {
      numberListItems[i].addEventListener('click', function () {
        const clickedNumber = parseInt(this.innerHTML);

        if (this.classList.contains('active')) {
          for (let j = i + 1; j < numberListItems.length; j++) {
            numberListItems[j].classList.remove('active');
          }
        } else {
          
          for (let j = 0; j <= i; j++) {
            numberListItems[j].classList.add('active');
          }
        }
        
      
      });
    }
  });

  useEffect(() => {

    loadNotification1();
    loadNotification2();
    loadNotification3();
    loadNotification4();

    
    loadNotification();

  }, []);

  return (
    <>
      <NftCal>
        <h2>ZiMax Participant</h2>
        <h3>Calculator</h3>
        <p>
          Calculate your potential result from participating in ZiMax by
          selecting NFT levels to activate below. The results are calculated for
          1 cycle of all selected levels. All calculations are for informational
          purposes only, and are not a public offer.
        </p>
      </NftCal>
      <NftGrid>
        <div className="nftGridItem">
          <div className="nftGridItemHeading">
            <h2>
              <span>x3</span> ZiMax
            </h2>
            <p>
              Basic NFT level program, which is best for those who are
              self-reliant and prefer independent development.
            </p>
          </div>
          <div className="nftGridBody">
          <ul className="number-list">
          {planData
                    .filter(item => item.plan_id === '1')
                    .map((item, index) => (
                      index === 0 ? (
             <li onClick={() => handleOne(item.stage_fees, item.stage_fees * 3)} className="active">
               {index + 1}
              </li>
              ) : (
              <li onClick={() => handleOne(item.stage_fees, item.stage_fees * 3)}>{index + 1}</li>
              )
              ))
            }
          </ul>

            <div className="nftInfo">
              <p>
                Cost of all selected slots{' '}
                <strong>
                  {' '}
                  <span id="costNft">{cost}</span> USDT
                </strong>
              </p>
              <h2>
                Results in 1 cycle{' '}
                <strong>
                  <span id="cycleNft">{cycle}</span> USDT
                </strong>
              </h2>
            </div>
                 
          </div>
        </div>
        <div className="nftGridItem">
          <div className="nftGridItemHeading">
            <h2>
              <span>x4</span> ZiMax
            </h2>
            <p>
              More advanced program, designed for team work. Results are
              achieved here through direct partners, as well as through
              spillovers from other participants.
            </p>
          </div>
          <div className="nftGridBody">
          <ul className="number-list">
          {planData
                    .filter(item => item.plan_id === '2')
                    .map((item, index) => (
                      index === 0 ? (
             <li onClick={() => handleTwo(item.stage_fees, item.stage_fees * 4)} className="active">
               {index + 1}
              </li>
              ) : (
              <li onClick={() => handleTwo(item.stage_fees, item.stage_fees * 4)}>{index + 1}</li>
              )
              ))
            }
          </ul>
            <div className="nftInfo">
              <p>
                Cost of all selected slots{' '}
                <strong>
                  {' '}
                  <span id="costNft2">{cost2}</span> USDT
                </strong>
              </p>
              <h2>
                Results in 1 cycle{' '}
                <strong>
                  <span id="cycleNft2">{cycle2}</span> USDT
                </strong>
              </h2>
            </div>
          </div>
        </div>

        <div className="nftGridItem">
          <div className="nftGridItemHeading">
            <h2>
              <span>Zx</span> ZiMax
            </h2>
            <p>
              Program with enhanced team building and development opportunities.
            </p>
          </div>
          <div className="nftGridBody">
          <ul className="number-list">
          {planData
            .filter(item => item.plan_id === '3')
            .map((item, index) => {
             
              const level1=parseFloat(item.stage_fees)*3*30/100;
              const level2=parseFloat(item.stage_fees)*7*70/100;
              const final1=level1+level2;
              let final=final1.toFixed();
              if (index === 0) {
                return (
                  <li
                    key={index}
                    onClick={() => handleThree(item.stage_fees, final)}
                    className="active"
                  >
                    {index + 1}
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    onClick={() => handleThree(item.stage_fees, final)}
                  >
                    {index + 1}
                  </li>
                );
              }
            })
          }
        </ul>
            <div className="nftInfo">
              <p>
                Cost of all selected slots{' '}
                <strong>
                  {' '}
                  <span id="costNft3">{cost3}</span> USDT
                </strong>
              </p>
              <h2>
                Results in 1 cycle{' '}
                <strong>
                  <span id="cycleNft3">{cycle3}</span> USDT
                </strong>
              </h2>
            </div>
          </div>
        </div>

          <div className="nftGridItem">
          <div className="nftGridItemHeading">
            <h2>
              <span>zGold</span> ZiMax
            </h2>
            <p>
              Exclusive program with ultimate opportunities for team work and
              development.
            </p>
          </div>
          <div className="nftGridBody">
          <ul className="number-list">
          {planData
            .filter(item => item.plan_id === '4')
            .map((item, index) => {
             
              let level1=parseFloat(item.stage_fees)*4*20/100;
              let level2=parseFloat(item.stage_fees)*8*30/100;
              let level3=parseFloat(item.stage_fees)*14*50/100;
              let final1=level1+level2+level3;
              let final=final1.toFixed();
              if (index === 0) {
                return (
                  <li
                    key={index}
                    onClick={() => handleFour(item.stage_fees, final)}
                    className="active"
                  >
                    {index + 1}
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    onClick={() => handleFour(item.stage_fees, final)}
                  >
                    {index + 1}
                  </li>
                );
              }
            })
          }
        </ul>
            <div className="nftInfo">
              <p>
                Cost of all selected slots{' '}
                <strong>
                  {' '}
                  <span id="costNft4">{cost4}</span> USDT
                </strong>
              </p>
              <h2>
                Results in 1 cycle{' '}
                <strong>
                  <span id="cycleNft4">{cycle4}</span> USDT
                </strong>
              </h2>
            </div>
          </div>
        </div>
      
          </NftGrid>
      <NftTotal>
      <h2>
          Total cost <strong>{cost + cost2 + cost3 + cost4} USDT</strong>
        </h2>
        <h2>
          Total profit <strong>{parseFloat(cycle) + parseFloat(cycle2) + parseFloat(cycle3) + parseFloat(cycle4)} USDT</strong>
        </h2>
      </NftTotal>
    </>
  );
}
