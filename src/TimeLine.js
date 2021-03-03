import React from 'react'
import './TimeLine.css'

function addClass() {
            var elements = document.getElementByClassName('timeline__button')
            elements.classList.add('active')
        }

function TimeLine () {
  return (
    <div className='timeline__container'>
        <div className='timeline__buttons__container'>
            <div className='timeline__button active'>LIVE</div>
            <div className='timeline__button'>1D</div>
            <div className='timeline__button'>1W</div>
            <div className='timeline__button'>1M</div>
            <div className='timeline__button'>3M</div>
            <div className='timeline__button'>1Y</div>
            <div className='timeline__button'>ALL</div>
        </div>
    </div>
  )
}

export default TimeLine
