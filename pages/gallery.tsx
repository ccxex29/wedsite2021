import {Image} from 'antd';
import {ImageList, ImageListItem, Skeleton} from '@mui/material';
import styles from '../styles/Gallery.module.sass';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
import dimensionsType from '../constants/types/dimensionsType';

const gallery = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [imagePaths, setImagePaths] = useState([]);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        trackDimensions();
        window.addEventListener('resize', trackDimensions);
        return () => {
            window.removeEventListener('resize', trackDimensions);
        }
    }, [])
    const trackDimensions = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        console.log(dimensions, window.innerWidth, window.innerHeight);
    };

    useEffect(() => {
        if (loading) {
            GetImages();
        }
    }, []);

    const GetImages = () => {
        axios.get('/api/list-gallery-images')
            .then(res => {
                if (res.data.data) {
                    setImagePaths(res.data.data);
                }
            })
            .catch(err => {
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const GetImageListItems = () => {
        if (!imagePaths) {
            return <></>;
        }
        return imagePaths.map(imagePath => (
            <ImageListItem key={imagePath}>
                <Image
                    src={`https://cdn.femmund.com/file/femmund-cdn/${imagePath}`}
                />
            </ImageListItem>
        ));
    }

    return (
        <main className={styles.cover}>
            {
                loading ?
                    (
                        <Masonry columns={dimensions.height > dimensions.width ? 3 : 4} spacing={8}>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                            <MasonryItem>
                                <Skeleton variant={'rectangular'} width={400} height={400} />
                            </MasonryItem>
                        </Masonry>
                    ) : (
                        <ImageList variant={'masonry'} cols={4} gap={8} className={styles.galleryThumbs}>
                            { GetImageListItems() }
                        </ImageList>
                    )
            }
        </main>
    );
}

export default gallery;
