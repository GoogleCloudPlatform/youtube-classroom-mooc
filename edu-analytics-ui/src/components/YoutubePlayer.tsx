import React from 'react';
import YouTube,{YouTubeProps} from 'react-youtube';

interface YouTubePlayer {
    videoId:string;
}

const YouTubePlayer : React.FunctionComponent<YouTubePlayer> = ({
    videoId
})=>{
    const onPlayerReady :YouTubeProps['onReady'] = (event)=>{
        event.target.pauseVideo();
    }
    const onPlayerStateChange : YouTubeProps['onStateChange'] = (event)=>{
        console.log(event);
    }
    const opts: YouTubeProps['opts'] = {
        height:'400',
        width:'640',
        playerVars:{
            autoplay:1,
        }
    }
    return(
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange} />
    )
}

export default YouTubePlayer;