import { JSX } from 'react'
import hitSplat from './assets/hitsplat.png'

type Props = {
    x: number
    y: number
    damage: number
}
const Hitsplat = ({
    x,
    y,
    damage
}: Props): JSX.Element => {
    return (
        <div className="hitsplat" style={{
            left: x,
            top: y
        }}>
            <span className="number">{damage}</span>
            <img className="image" src={hitSplat} alt="hitsplat" />
        </div>
    )
}

export default Hitsplat;