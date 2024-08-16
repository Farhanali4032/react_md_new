import React from 'react';

const Seal = ({ text, circle = true }) => {
    return (
        <div>
            {circle ? (
                <div className="mx-auto d-flex justify-content-center align-items-center border rounded-circle border-dark text-uppercase fw-bold" style={{ height: "120px", width: "120px" }}>
                    {text}
                </div>
            ) : (
                <div className="text-uppercase fw-bold" >
                    [{text}]
                </div>
            )}
        </div>
    );
};

export default Seal;
