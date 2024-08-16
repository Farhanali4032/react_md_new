import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function Listings({ items }) {
    return (
        <ListGroup  className='border-0' numbered>
            {items.map((item, index) => (
                <ListGroup.Item  key={index} className='border-0 small py-0 px-1'>
                    {item.map((part, partIndex) => (
                        part.isLink ? (
                            <a key={partIndex} href={part.url} target="_blank" rel="noopener noreferrer">
                                {part.text}
                            </a>
                        ) : (
                            <span key={partIndex}> {part.text} </span>
                        )
                    ))}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default Listings;
