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
    testing: boolean;
    updateTesting: (testing: boolean) => void;
};

const Stats = ({
    geoLocation,
    goalLoc,
    goalDistance,
    testing,
    updateTesting,
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
            <span>
                testing mode
                <input
                    type="checkbox"
                    id="testing"
                    name="testing"
                    checked={testing}
                    onChange={() => updateTesting(!testing)}
                ></input>
            </span>
        </div>
    );
};

export default Stats;
