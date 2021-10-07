import {Image as AntdImage} from 'antd';
import {Alert, ImageList, ImageListItem, Skeleton} from '@mui/material';
import styles from '../styles/Gallery.module.sass';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
import NProgress from 'nprogress';

const Gallery = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState({
        isError: false,
        message: '',
    });
    const [imagePaths, setImagePaths] = useState<Array<string>>([]);

    useEffect(() => {
        if (loading) {
            loadCalls()
        }
    }, [loading]);

    const loadCalls = async () => {
        await getImages();
        await preloadThumbs();
        NProgress.done();
        setLoading(false);
    }

    const getImages = async () => {
        await axios.get('/api/list-gallery-images')
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
            });
    }

    const preloadThumbs = async () => {
        const thumbPromises = imagePaths.map((imagePath: string) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = `https://imgix.femmund.com/${imagePath}?w=50&blur=50&q=87`;
                // @ts-ignore
                img.onload = resolve();
                // @ts-ignore
                img.onerror = reject();
            });
        });
        await Promise.all(thumbPromises);
    }

    const GetImageListItems = () => {
        if (!imagePaths) {
            return <></>;
        }
        return imagePaths.map(imagePath => (
            <ImageListItem key={imagePath} className={styles.galleryThumb}>
                <AntdImage
                    src={`https://imgix.femmund.com/${imagePath}`}
                    loading={'lazy'}
                    alt={''}
                    placeholder={
                        <AntdImage style={{width: '100%', height: '100%'}} src={`https://imgix.femmund.com/${imagePath}?w=50&blur=50&q=87`} />
                    }
                />
            </ImageListItem>
        ));
    }

    return (
        <main className={styles.cover}>
            {
                errorMessage.isError ?
                    <Alert severity={'error'}>
                        { errorMessage.message }
                    </Alert> :
                    null
            }
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
