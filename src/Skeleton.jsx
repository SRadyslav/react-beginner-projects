import React from 'react'

export const Skeleton = () => {
    return (
        <div className="collection">
            <img className="collection__big skeleton" />
            <div className="collection__bottom">
                <img className="collection__mini skeleton" />
                <img className="collection__mini skeleton" />
                <img className="collection__mini skeleton" />
            </div>
            <h4 className='skeleton_text'>lorem</h4>
        </div>
    );
}