import React from 'react'
import { Link } from 'react-router-dom'

const BoldandThinText = ({ bold, thin, secondbold, link, linktext, italic, secondthin, centered }) => {
    return (
        <>
           <p className={`paragraph small ${centered ? 'text-center' : ''}`}>

                    {/* className='fw-bold small' */}
                <span className={italic ? "fw-bold fst-italic small" : "small"} >
                    {bold}
                </span>
                <span className={italic ? "fst-italic small" : "small"}>{thin}</span>

                <span className='fw-bold small'>
                    {secondbold}
                    {link ? <Link to={link}><i>{linktext}</i></Link> : null}
                </span>
                <span className={italic ? "fst-italic small" : "small"}>{secondthin}</span>
            </p>
        </>
    )
}

export default BoldandThinText