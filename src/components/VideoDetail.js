import React, { Component } from 'react';
import { Icon } from "antd";

class VideoDetail extends Component {
    state = {
        video: null
    };

    componentDidUpdate(prevProps) {
        if (this.props.video && (prevProps.video !== this.props.video)) {
            this.setState({ video: this.props.video })
        }
    }

    render() {
        const video = this.state.video;

        if (!video) {
            return (
                <div style={{ "width": "67.5%", "background": "#ffffff", "color": "#fff", "height": "85vh", "postion": "relative" }}>
                    <h3 style={{ "top": "50%", "left": "28%", "position": "absolute", "color":"ffffff" }}><Icon type={"youtube"} /></h3>
                </div>
            )
        }

        const videoId = video.id.videoId;
        const url = `https://www.youtube.com/embed/${videoId}`;

        return (
            <div>
                <div className={"embed-responsive embed-responsive-16by9"}>
                    <iframe title={video.snippet.title} className={"embed-responsive-item"} src={url} allowFullScreen />
                </div>
                <div>
                    <h4 style={{"color":"#ffffff"}}>
                        {video.snippet.title}
                    </h4>
                    <div style={{"color":"#ffffff"}}>
                        {video.snippet.description}
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoDetail;