import React from "react";
import ChevronRightIcon from "@/material-icons/400-24px/chevron_right-gray.svg?react";

const LocalCommunities = () => {
  return (
    <div className="communities__list-wrapper">
      {[0, 1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="communities__list">
          <div className="communities__list__item">
            <img
              className="communities__list__item__img"
              src="http://localhost:3000/packs/media/images/preview-6399aebd96ccf025654e2977454f168f.png"
              alt="img"
            />
            <div className="communities__list__item__info">
              <p>Community name</p>
              <div>
                <span>365</span>
                <span>Followers</span>
              </div>
            </div>
          </div>
          <div className="communities__list__item__icon">
            {/* <div className='communities__list__item__icon__all'>icon</div> */}
            <p>
              <ChevronRightIcon />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocalCommunities;
