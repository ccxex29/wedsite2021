import {BackTop} from 'antd';

const BottomFAB = (): JSX.Element => {
    return (
        <BackTop style={{
            right: 50,
            bottom: 50,
            position: 'fixed',
        }} />
    )
}

export default BottomFAB;
