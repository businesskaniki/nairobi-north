import React, { useEffect, useRef, useState } from "react";
import { AudioPlayer } from "../ReusableComponents/AudioPlayer";
import "../../styles/sermon.css";
import VideoPlayer from "../ReusableComponents/Videoplayer";

const Sermons = () => {
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setVideoLoading(false);
      });

      videoRef.current.addEventListener("waiting", () => {
        setVideoLoading(true);
      });
    }
  }, [videoRef]);

  const sermn = [
    {
      audio: null,
      video:
        "https://player.vimeo.com/external/298678854.sd.mp4?s=707a5c40236da4d0f03c8a43ec8ffa5b7c9e4ff7&profile_id=164&oauth2_token_id=57447761",
    },
    {
      audio:
        "https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3",
      video: null,
    },
  ];

  const vid = "https://player.vimeo.com/external/298678854.sd.mp4?s=707a5c40236da4d0f03c8a43ec8ffa5b7c9e4ff7&profile_id=164&oauth2_token_id=57447761"

  return (
  
        <>
        <div className="videos">
          <div className="videos__container">
            <VideoPlayer media={vid} />

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/YpTmcCBBdTE/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="http://aninex.com/images/srvc/web_de_icon.png"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Build A Password Generator with React JS - Beginners
                    Tutorial
                  </h3>
                  <a href="">FutureCoders</a>
                  <span>10M Views • 3 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/46cXFUzR9XM/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnh53ZRIGnyzC28QrfuggCINb3cfNbNWo4Uc6qR9=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Bella Ciao Full Song | La Casa De Papel | Money Heist |
                    Netflix India
                  </h3>
                  <a href="">Netflix</a>
                  <span>10M Views • 11 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/d2na6sCyM5Q/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnhESPVEatju_1yE-03-KLeSrnSLc5yy0RcvhPd5Lg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>DON'T EVER GIVE UP - Elon Musk (Motivational Video)</h3>
                  <a href=""> Chispa Motivation</a>
                  <span>10M Views • 1 Month Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/2Ji-clqUYnA/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwniaHN7MZyFEiNvdHuKMzIWnDF604Z2--O4GCMq-FA=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>Javascript Fundamentals</h3>
                  <a href="">Coding Addict</a>
                  <span>179K • 8 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/3PHXvlpOkf4/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Build 15 JavaScript Projects - Vanilla JavaScript Course
                  </h3>
                  <a href=""> freeCodeCamp.org </a>
                  <span>470K Views • 8 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/CVClHLwv-4I/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnhIz_0Su6HhW6Ym50QCroJCAnF10X9xnnMDboN2=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>Build Real Time Face Detection With JavaScript</h3>
                  <a href=""> Web Dev Simplified </a>
                  <span>875K Views • 1 Year Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/ulprqHHWlng/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>AWS Basics for Beginners - Full Course</h3>
                  <a href=""> freeCodeCamp.org </a>
                  <span>36K Views • 1 Day Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/PpXUTUXU7Qc/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="http://aninex.com/images/srvc/web_de_icon.png"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Top 5 Programming Languages to Learn in 2021 | Best
                    Programming Languages to Learn
                  </h3>
                  <a href="">FutureCoders</a>
                  <span>10M Views • 3 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/YpTmcCBBdTE/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="http://aninex.com/images/srvc/web_de_icon.png"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Build A Password Generator with React JS - Beginners
                    Tutorial
                  </h3>
                  <a href="">FutureCoders</a>
                  <span>10M Views • 3 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/46cXFUzR9XM/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnh53ZRIGnyzC28QrfuggCINb3cfNbNWo4Uc6qR9=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Bella Ciao Full Song | La Casa De Papel | Money Heist |
                    Netflix India
                  </h3>
                  <a href="">Netflix</a>
                  <span>10M Views • 11 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/d2na6sCyM5Q/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnhESPVEatju_1yE-03-KLeSrnSLc5yy0RcvhPd5Lg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>DON'T EVER GIVE UP - Elon Musk (Motivational Video)</h3>
                  <a href=""> Chispa Motivation</a>
                  <span>10M Views • 1 Month Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/2Ji-clqUYnA/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwniaHN7MZyFEiNvdHuKMzIWnDF604Z2--O4GCMq-FA=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>Javascript Fundamentals</h3>
                  <a href="">Coding Addict</a>
                  <span>179K • 8 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/3PHXvlpOkf4/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Build 15 JavaScript Projects - Vanilla JavaScript Course
                  </h3>
                  <a href=""> freeCodeCamp.org </a>
                  <span>470K Views • 8 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/CVClHLwv-4I/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnhIz_0Su6HhW6Ym50QCroJCAnF10X9xnnMDboN2=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>Build Real Time Face Detection With JavaScript</h3>
                  <a href=""> Web Dev Simplified </a>
                  <span>875K Views • 1 Year Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/ulprqHHWlng/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>AWS Basics for Beginners - Full Course</h3>
                  <a href=""> freeCodeCamp.org </a>
                  <span>36K Views • 1 Day Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/PpXUTUXU7Qc/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="http://aninex.com/images/srvc/web_de_icon.png"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Top 5 Programming Languages to Learn in 2021 | Best
                    Programming Languages to Learn
                  </h3>
                  <a href="">FutureCoders</a>
                  <span>10M Views • 3 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/YpTmcCBBdTE/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="http://aninex.com/images/srvc/web_de_icon.png"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Build A Password Generator with React JS - Beginners
                    Tutorial
                  </h3>
                  <a href="">FutureCoders</a>
                  <span>10M Views • 3 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/46cXFUzR9XM/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnh53ZRIGnyzC28QrfuggCINb3cfNbNWo4Uc6qR9=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Bella Ciao Full Song | La Casa De Papel | Money Heist |
                    Netflix India
                  </h3>
                  <a href="">Netflix</a>
                  <span>10M Views • 11 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/d2na6sCyM5Q/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnhESPVEatju_1yE-03-KLeSrnSLc5yy0RcvhPd5Lg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>DON'T EVER GIVE UP - Elon Musk (Motivational Video)</h3>
                  <a href=""> Chispa Motivation</a>
                  <span>10M Views • 1 Month Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/2Ji-clqUYnA/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwniaHN7MZyFEiNvdHuKMzIWnDF604Z2--O4GCMq-FA=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>Javascript Fundamentals</h3>
                  <a href="">Coding Addict</a>
                  <span>179K • 8 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/3PHXvlpOkf4/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>
                    Build 15 JavaScript Projects - Vanilla JavaScript Course
                  </h3>
                  <a href=""> freeCodeCamp.org </a>
                  <span>470K Views • 8 Months Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/CVClHLwv-4I/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnhIz_0Su6HhW6Ym50QCroJCAnF10X9xnnMDboN2=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>Build Real Time Face Detection With JavaScript</h3>
                  <a href=""> Web Dev Simplified </a>
                  <span>875K Views • 1 Year Ago</span>
                </div>
              </div>
            </div>

            <div className="video">
              <div className="video__thumbnail">
                <img
                  src="https://img.youtube.com/vi/ulprqHHWlng/maxresdefault.jpg"
                  alt="" />
              </div>
              <div className="video__details">
                <div className="author">
                  <img
                    src="https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s48-c-k-c0x00ffffff-no-rj"
                    alt="" />
                </div>
                <div className="title">
                  <h3>AWS Basics for Beginners - Full Course</h3>
                  <a href=""> freeCodeCamp.org </a>
                  <span>36K Views • 1 Day Ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default Sermons;
