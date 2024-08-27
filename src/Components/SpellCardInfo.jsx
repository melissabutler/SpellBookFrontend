import React, { useEffect } from "react";

import "./Tooltip.css"

const SpellCardInfo = ({spellInfo, title, altText, small}) => {

    return(
        <div className={`SpellCard-info ${spellInfo}`}
            name={`${spellInfo}`}
            >
                {small ? 
                <div className="tooltip">
                    {title}: {spellInfo}
                    <div className="tooltip-text">
                        {altText}
                    </div>
                </div>
                :
                <div className="tooltip">
                <h4>{title}</h4>
                <h5>{spellInfo}</h5>
                <div className="tooltip-text">
                    {altText}
                </div>

                </div>
}
                

        </div>
    )
}

export default SpellCardInfo;