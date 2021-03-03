import React, { useState, useEffect } from 'react'
import './Stats.css'
import axios from 'axios'
import StatsRow from './StatsRow'
import { db } from './firebase'

// if token expires, regenerate it from here: https://finnhub.io/dashboard
const TOKEN = 'c0q85jn48v6s0mp5ul3g'
const BASE_URL = 'https://finnhub.io/api/v1/quote'

function Stats () {
  const [stockData, setstockData] = useState([])
  const [myStocks, setmyStocks] = useState([])
  const getMyStocks = () => {
    db
      .collection('myStocks')
      .onSnapshot(snapshot => {
        const promises = []
        const tempData = []
        snapshot.docs.map(doc => {
          promises.push(getStocksData(doc.data().ticker)
            .then((res) => {
              tempData.push({
                id: doc.id,
                data: doc.data(),
                info: res.data
              })
            })
          )
        })
        Promise.all(promises).then(() => {
      	  setmyStocks(tempData)
        })
      })
  }

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch(error => {
        console.error('Error', error.message)
      })
  }

  useEffect(() => {
    const tempStocksData = []
    const stocksList = ['AAPL', 'MSFT', 'TSLA', 'FB', 'BABA', 'UBER', 'DIS', 'SBUX']
    const promises = []
    getMyStocks()
    stocksList.map(stock => {
      promises.push(
        getStocksData(stock)
          .then((res) => {
            tempStocksData.push({
              name: stock,
              ...res.data
            })
          })
      )
    })

    Promise.all(promises).then(() => {
      setstockData(tempStocksData)
    })
  }, [])

  return (
    <div className='stats'>
      <div className='stats__conatiner'>
        <div className='stats__header'>
          <p>Stocks</p>
        </div>
        <div className='stats__content'>
          <div className='stats__rows'>
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                shares={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className='stats__header stats__lists'>
          <p>Lists</p>
        </div>
        <div className='stats__content'>
          <div className='stats__rows'>
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
