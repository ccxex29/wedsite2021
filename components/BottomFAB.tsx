import {BackTop} from 'antd';

const BottomFAB = (): JSX.Element => {
    return (
        <div
            role={'navigation'}
            aria-label={'Back To Top'}
            style={{
                right: 50,
                bottom: 50,
                position: 'fixed',
            }}
        >
            <BackTop />
        </div>
    )
}

export default BottomFAB;
