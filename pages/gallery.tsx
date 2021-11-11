import AntdImage from 'antd/lib/image';
import {Alert, ImageList, ImageListItem} from '@mui/material';
import styles from '../styles/Gallery.module.sass';
import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import NProgress from 'nprogress';
import useWindowSize from '../components/hooks/useWindowSize';

const Gallery = (): JSX.Element => {
    const dimensions = useWindowSize();
    const [loading, setLoading] = useState(true);
    const [loadingPercentage, setLoadingPercentage] = useState<string>('0');
    const [doneCount, setDoneCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState({
        isError: false,
        message: '',
    });
    const [imagePaths, setImagePaths] = useState<Array<string>>([]);
    const imagePathCount = useRef(1);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    useEffect(() => {
        setLoadingPercentage((doneCount / imagePathCount.current * 100).toFixed(2));
    }, [doneCount]);

    useEffect(() => {
        const imageLoader = async () => {
            const processNums = 4;
            const clonedImagePaths = [...imagePaths];
            const clonedImageKeys = [...imagePaths.keys()];
            const imageLoad = (imagePath: string, imageKey: number) => {
                return new Promise((resolve, reject) => {
                    fetch(`https://imgix.femmund.com/${imagePath}?fit=clip&h=1440&q=75&auto=compress,format`)
                        .then(res => res.blob())
                        .then(blob => new Promise(resolve => {
                            const fReader = new FileReader();
                            fReader.onload = function () {
                                resolve(this.result);
                            };
                            fReader.readAsDataURL(blob);
                        }))
                        .then(base64Img => {
                            if (typeof base64Img === 'string') {
                                setLoadedImages(prev => {
                                    prev[imageKey] = base64Img;
                                    return prev;
                                });
                            }
                            setDoneCount(prevState => ++prevState);
                            resolve(base64Img);
                        })
                        .catch(() => {
                            console.error('Error fetching image data');
                            reject();
                        });
                });
            };
            while (clonedImagePaths.length) {
                const promises: Promise<any>[] = [];
                const path = clonedImagePaths.splice(0, processNums);
                const keys = clonedImageKeys.splice(0, processNums);
                if (!path) {
                    return;
                }
                for (let i = 0; i < path.length; i++) {
                    promises.push(imageLoad(path[i], keys[i]));
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
        return imagePaths.map((imagePath, imageIter) => (
            <ImageListItem key={imagePath} className={styles.galleryThumb}>
                <div src-path={imagePath}>
                    <AntdImage
                        src={loadedImages[imageIter] || ''}
                        alt={''}
                    />
                </div>
            </ImageListItem>
        ));
    }

    return (
        <main className={styles.cover}>
            {
                errorMessage.isError ?
                    <Alert severity={'error'} style={{marginBottom: 20}}>
                        {errorMessage.message}
                    </Alert> :
                    null
            }
            <ImageList variant={'masonry'} cols={dimensions.width < 1000 ? 3 : 4} gap={8} className={styles.galleryThumbs}>
                {GetImageListItems()}
            </ImageList>
        </main>
    );
}

export default Gallery;
