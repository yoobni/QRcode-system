import React, { ReactNode, useState, useEffect } from "react";
import Image from 'next/image';
import styled from "styled-components";
import {
    Layout,
    Row,
    Col,
    Form,
    DatePicker,
    Button,
    notification,
    Divider,
    ConfigProvider,
    Flex,
    QRCode,
    Typography,
    Skeleton,
} from 'antd';
import type { FormInstance } from 'antd';
import theme from '../theme/themeConfig';
import DataEntry, { DataEntryType, } from "@components/Layout/DataEntry";
import { Footer } from '@components/Template';
import type { RadioChangeEvent } from 'antd';
import { useRouter } from "next/router";
import { parseCookies, setCookie } from 'nookies';
// import { QRCode } from 'react-qrcode-logo';



const { Text, Title, Link } = Typography;
const { RangePicker } = DatePicker;
const { Header, Content } = Layout;

export default function Main() {
    const [form] = Form.useForm();
    const [value, setValue] = useState<string>('');
    const router = useRouter();

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cookies = parseCookies();
            const tmpData = cookies.data || null;

            if (tmpData != null) {
                const resultData = JSON.parse(tmpData);
                console.log(resultData);

                setData(resultData);
            }
        }
    }, []);

    return (
        <ConfigProvider
            theme={theme}
            componentSize={'large'}
        >
            <Layout
                style={{
                    padding: '10px',
                    minHeight: 'calc(100vh - env(safe-area-inset-bottom))',
                }}
            >
                <Content
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                        margin: '100px auto 32px',
                        padding: '56px 16px 16px',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        boxShadow: '0 0.5px 8px rgba(0, 0, 0, 0.06), 0 1.5px 10px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <LogoBox>
                        {/*<img*/}
                        {/*    src="/images/logo.png"*/}
                        {/*    alt=""*/}
                        {/*    style={{*/}
                        {/*        width: '85px',*/}
                        {/*        height: '85px',*/}
                        {/*        borderRadius: '5px',*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </LogoBox>
                    <Flex>
                        <Title level={2}>test</Title>
                    </Flex>
                    <Flex
                        style={{
                            padding: '30px 0',
                        }}
                    >
                        <Skeleton active />
                    </Flex>
                    {/*<Flex>*/}
                    {/*    {data === null ? (*/}
                    {/*        <QRCode*/}
                    {/*         */}
                    {/*        />*/}
                    {/*    ) : (*/}
                    {/*        <QRCode*/}
                    {/*            value={`generate`}*/}
                    {/*            // status={'loading'}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*</Flex>*/}
                        <Flex
                            justify={'center'}
                            style={{
                                paddingTop: '30px',
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{

                                    width: '100%',
                                    border: 'none',
                                    color: 'white',
                                    background: '#1677ff',
                                }}
                            >
                                다시 작성하기
                            </Button>
                        </Flex>
                        {value.length > 0 && (
                            <Flex
                                justify={'center'}
                                style={{
                                    paddingTop: '50px',
                                }}
                            >
                                <QRCode
                                    errorLevel="H"
                                    value={"https://ant.design/"}
                                    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                />
                            </Flex>
                        )}
                        <Flex
                            style={{
                                paddingTop: '30px',
                            }}
                        >
                            <Text disabled>입력한 데이터는 서버에 저장되지 않습니다.</Text>
                        </Flex>
                </Content>
                <Footer />
            </Layout>
        </ConfigProvider>
    )
}

const FormItem = styled(Form.Item)`
    display: flex;
    flex-direction: row;
    width: 100%;
    
    .ant-form-item-label {
        padding: 0 0 0 !important;    
    }
  
    .ant-form-item-row {
        width: 100%;
    }
`;

const LogoBox = styled.div`
    position: absolute;
    top: -60px;
    left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background: white;
    z-index: 10;
    box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.03), 0 1.5px 5px rgba(0, 0, 0, 0.06);
`;

const QuestionCol = styled(Col)`
    flex: 1;
    padding: 16px 8px;
    border: 1px solid #efefef;
  
    .problem-button {
       display: flex;
        flex: 1; 
        align-items: center;
        justify-content: center;
    }

    b {
        color: red;
    }
`;

const SubmitButton = ({ form, children }: { form: FormInstance, children: ReactNode }) => {
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => {
                    setSubmittable(true);
                }, () => {
                    setSubmittable(false);
                },
            );
    }, [values]);

    return (
        <Button
            type="primary"
            htmlType="submit"
            style={
                submittable ? {
                    width: '100%',
                    border: 'none',
                    color: 'white',
                    background: '#1677ff',
                } : {
                    width: '100%',
                    borderColor: 'rgb(217, 217, 217)',
                    color: 'rgba(0, 0, 0, 0.25)',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    boxShadow: 'none',
                }
            }
            disabled={!submittable}
        >
            {children}
        </Button>
    );
};
