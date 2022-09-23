import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => {navigate.push('/')}}>Home</button> |
                <button onClick={() => {navigate.goBack()}}>Back</button>
            </div>
        )
    }

        const allSongs = albumData.filter(entity => entity.kind === 'song')
    .map((album, i) => {
        return (
            <div key={i}>
                <p>{album.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            {albumData.length > 0 ? <h2>{albumData[0].collectionName}</h2> : <p>loading...</p>}
            {navButtons()}
            {allSongs}
        </div>
    )
}

export default AlbumView