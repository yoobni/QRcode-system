import React, { memo } from "react";
import {
    Col,
    Row,
    Typography,
} from "antd";
const {
    Text,
} = Typography;

const Footer = () => {
    return (
        <Row
            justify={'space-between'}
            style={{
                padding: '30px',
            }}
        >
            <Col
                flex={'auto'}
                sm={{ span: 12 }}
            >
                <Text
                    style={{
                        fontSize: '10px',
                    }}
                    disabled
                >
                    Copyright© 2023. HYCO. All rights reserved
                </Text>
            </Col>
            <Col
                style={{
                    alignItems: 'flex-end'
                }}
            >
                <Text
                    style={{
                        fontSize: '10px',
                    }}
                    disabled
                >
                    해당 페이지는 데모버전으로, 상업적 용도로 사용할 수 없습니다.
                </Text>
            </Col>
        </Row>
    )
}

export default memo(Footer);