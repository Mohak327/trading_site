import React from 'react'
import './StatsRow.css'
import StockSVG from './stock.svg'
import { db } from './firebase'

function StatsRow (props) {

    const percentage = ((props.price - props.openPrice) / props.openPrice) * 100

    const buyStock = () => {
        db.collection('myStocks')
        .where('ticker', '==', props.name)
        .get()
        .then((querySnapshot) => {
            console.log(querySnapshot)
            if(!querySnapshot.empty){
                //update the record
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                    db.collection('myStocks')
                    .doc(doc.id)
                    .update({
                        shares: doc.data().shares += 1
                    })
                }) 
            } else {
                db.collection('myStocks')
                .add({
                    ticker: props.name,
                    shares: 1
                })
            }
        })
    }

    return (
        <div className='row' onClick={buyStock}>
            <div className='row__intro'>
                <h1>{props.name}</h1>
                <p>{props.shares && (props.shares + ' shares')}</p>
            </div>

            <div className='row__chart'>
                <img src={StockSVG} height={16} />
            </div>

            <div className='row__numbers'>
                <p className='row__price'>{props.price}</p>
                <p className='row__percentage'>{Number(percentage).toFixed(2)}%</p>
            </div>
        </div>
    )
}

export default StatsRow
