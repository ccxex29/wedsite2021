import AntdImage from 'antd/lib/image';
import {Alert, ImageList, ImageListItem} from '@mui/material';
import styles from '../styles/Gallery.module.sass';
import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import NProgress from 'nprogress';

const Gallery = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [loadingPercentage, setLoadingPercentage] = useState<string>('0');
    const [doneCount, setDoneCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState({
        isError: false,
        message: '',
    });
    const [imagePaths, setImagePaths] = useState<Array<string>>([]);
    const imagePathCount = useRef(1);

    useEffect(() => {
        setLoadingPercentage((doneCount/imagePathCount.current * 100).toFixed(2));
    }, [doneCount]);

    useEffect(() => {
        const imageLoader = async () => {
            const processNums = 4;
            const clonedImagePaths = [...imagePaths];
            const imageLoad = (imagePath: string) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `https://imgix.femmund.com/${imagePath}`;
                    img.addEventListener('load', () => {
                        setDoneCount(prevState => ++prevState);
                        resolve(img);
                    });
                    img.addEventListener('error', () => {
                        setDoneCount(prevState => ++prevState);
                        reject(img);
                    });
                });
            };
            while (clonedImagePaths.length) {
                const promises: Promise<any>[] = [];
                const path = clonedImagePaths.splice(0, processNums);
                if (!path) {
                    return;
                }
                for (let i = 0; i < path.length; i++) {
                    promises.push(imageLoad(path[i]));
                }
                await Promise.all(promises);
            }
        }

        const loadCalls = async () => {
            if (imagePaths.length) {
                await imageLoader();
                NProgress.done();
                setLoading(false);
            }
        }

        loadCalls();
    }, [imagePaths]);

    useEffect(() => {
        const getImages = async () => {
            return axios.get('/api/list-gallery-images')
                .then(res => {
                    if (res.data.data) {
                        setImagePaths(res.data.data);
                        imagePathCount.current = res.data.data.length || -1;
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

        const loadCalls = async () => {
            await getImages();
        }

        if (loading) {
            loadCalls();
        }
    }, [loading]);

    const GetImageListItems = () => {
        if (!imagePaths) {
            return <></>;
        }
        return imagePaths.map(imagePath => (
            <ImageListItem key={imagePath} className={styles.galleryThumb}>
                <AntdImage
                    src={`https://imgix.femmund.com/${imagePath}`}
                    alt={''}
                />
            </ImageListItem>
        ));
    }

    return (
        <main className={styles.cover}>
            {
                errorMessage.isError ?
                    <Alert severity={'error'} style={{marginBottom: 20}}>
                        { errorMessage.message }
                    </Alert> :
                    null
            }
            {
                loading ?
                    (
                        <div className={styles.loadingPercentage}>
                            <div>Please Wait While We&apos;re Loading</div>
                            <div>
                                {loadingPercentage} %
                            </div>
                        </div>
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
