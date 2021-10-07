import {Image} from 'antd';
import {ImageList, ImageListItem, Skeleton} from '@mui/material';
import styles from '../styles/Gallery.module.sass';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
import dimensionsType from '../constants/types/dimensionsType';

const Gallery = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState({
        isError: false,
        message: '',
    });
    const [imagePaths, setImagePaths] = useState([]);

    useEffect(() => {
        if (loading) {
            GetImages();
        }
    }, [loading]);

    const GetImages = () => {
        axios.get('/api/list-gallery-images')
            .then(res => {
                if (res.data.data) {
                    setImagePaths(res.data.data);
                }
            })
            .catch(err => {
                let errMsg = err.response.data.message || 'Unknown error occurred';
                setErrorMessage({
                    isError: true,
                    message: errMsg,
                });
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
            <ImageListItem key={imagePath} className={styles.galleryThumb}>
                <Image
                    src={`https://imgix.femmund.com/${imagePath}`}
                    placeholder={
                        <Image style={{width: '100%', height: '100%'}} src={`https://imgix.femmund.com/${imagePath}?w=50&blur=50&q=87`} />
                    }
                />
            </ImageListItem>
        ));
    }

    return (
        <main className={styles.cover}>
            {
                loading ?
                    (
                        <Masonry columns={4} spacing={8}>
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

export default Gallery;
