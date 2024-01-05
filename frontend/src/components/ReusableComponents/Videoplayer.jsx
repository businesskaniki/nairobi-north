import React from "react";

const Videoplayer = ({ media }) => {
  return (
    <div class="video">
      <div class="video__thumbnail">
        <video
          id="my-video"
          autoplay={false}
          class="video-js vjs-theme-fantasy"
          preload="auto"
          controls 
          width="100%"
          height="100%"
          poster="https://wallpapercave.com/wp/wp3305861.jpg"
          data-setup="{}"
        >
          <source src={media} type="video/mp4" />
        </video>
      </div>
      <div class="video__details">
        <div class="author">
          <img
            src="https://yt3.ggpht.com/ytc/AAUvwniaHN7MZyFEiNvdHuKMzIWnDF604Z2--O4GCMq-FA=s48-c-k-c0x00ffffff-no-rj"
            alt=""
          />
        </div>
        <div class="title">
          <h3>Christ is the only solution for youths by Rev James</h3>
          <a href="">pefa darasha</a>
          <span>8 Months Ago</span>
        </div>
      </div>
    </div>
  );
};

export default Videoplayer;
