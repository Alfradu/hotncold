import {
    HeadingDistance,
    LatitudeLongitude,
    normalizeHeading,
} from 'geolocation-utils';
import { headingToOrientation } from './utils/utils';
import { JSX, useState } from 'react';

type Props = {
    geoLocation: LatitudeLongitude;
    goalLoc: LatitudeLongitude;
    goalDistance: HeadingDistance;
};

const Stats = ({
    geoLocation,
    goalLoc,
    goalDistance,
}: Props): JSX.Element => {
    const [showStats, setShowStats] = useState<boolean>(false);

    return (
        <div className="stats">
            {showStats && (
                <>
                    <span>
                        pos Lat {geoLocation.latitude} ,pos Long {geoLocation.longitude}
                    </span>
                    <span>
                        goal Lat {goalLoc.latitude} ,goal Long {goalLoc.longitude}
                    </span>
                    <span>Distance: {Math.floor(goalDistance.distance)} m</span>
                    <span>
                        Heading:{' '}
                        {headingToOrientation(normalizeHeading(goalDistance.heading), true)}
                    </span>
                </>
            )}
            <span>
                show stats
                <input
                    type="checkbox"
                    id="stats"
                    name="stats"
                    checked={showStats}
                    onChange={() => setShowStats(!showStats)}
                ></input>
            </span>
        </div>
    );
};

export default Stats;
