import Image from 'next/image';
import image0 from '../public/gallery-images/BUD_5656.jpg';
import image1 from '../public/gallery-images/BUD_5656.jpg';
import image2 from '../public/gallery-images/BUD_5656.jpg';
import image3 from '../public/gallery-images/BUD_5656.jpg';
import Flicking from '@egjs/react-flicking';
import {JustifiedLayout} from '@egjs/react-infinitegrid';

const gallery = (): JSX.Element => {
    const GetImages = (): JSX.Element => {
        return (
            <>
                <Image src={image0} />
                <Image src={image1} />
                <Image src={image2} />
                <Image src={image3} />
            </>
        );
    }
    return (
        <main>
        </main>
    );
}

export default gallery;
