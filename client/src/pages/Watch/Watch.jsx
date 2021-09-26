import { ArrowBackOutlined } from '@material-ui/icons'
import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import './Watch.scss'

const Watch = () => {
    const location = useLocation();

    const movie = location.movie;

    return (
        <div className="watch">
            <Link to="/" className="link">
            <div className="back">
                <ArrowBackOutlined/>
                <span>Home</span>
            </div>
            </Link>
            <video className="video" autoPlay progress controls src={movie.video} />
        </div>
    )
}

export default Watch
