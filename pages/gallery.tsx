import Image from 'next/image';
import {ImageList, ImageListItem} from '@mui/material';
import styles from '../styles/Gallery.module.sass';
import han from '../public/HAN_8770.jpg';
import hon from '../public/gallery-images/BUD_5687.jpg';
import hen from '../public/gallery-images/BUD_5916.jpg';
import hun from '../public/gallery-images/BUD_5998.jpg';
import hin from '../public/gallery-images/BUD_5929.jpg';
import hbn from '../public/gallery-images/BUD_6170.jpg';

const gallery = (): JSX.Element => {
    const GetImages = async () => {
        const imgComponentList: JSX.Element[] = [];
        const imgsPath = '../public/gallery-images';
        const images = require.context('../public/gallery-images', false, /\.(png|jpe?g|webp)$/).keys();
        for (const path of images) {
            const index: number = images.indexOf(path);
            const img = await import(`${imgsPath}/${path}`);
            imgComponentList.push(
                <ImageListItem key={`image-gallery-${index}`}>
                    <Image src={img} layout={'fill'} />
                </ImageListItem>
            )
        }
        return imgComponentList;
    }
    return (
        <main className={styles.cover}>
            <ImageList variant={'masonry'} cols={3} gap={8}>
                <ImageListItem>
                    <Image src={han} />
                </ImageListItem>
                <ImageListItem>
                    <Image src={hon} />
                </ImageListItem>
                <ImageListItem>
                    <Image src={hun} />
                </ImageListItem>
                <ImageListItem>
                    <Image src={hbn} />
                </ImageListItem>
                <ImageListItem>
                    <Image src={hen} />
                </ImageListItem>
                <ImageListItem>
                    <Image src={hin} />
                </ImageListItem>
                {/*{ GetImages() }*/}
            </ImageList>
        </main>
    );
}

export default gallery;
