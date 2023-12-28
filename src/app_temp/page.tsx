'use client';
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
} from 'antd';
import type { FormInstance } from 'antd';
import theme from '../theme/themeConfig';
import DataEntry, { DataEntryType, } from "@components/Layout/DataEntry";
import { Footer } from '@components/Template';

const { Text, Title, Link } = Typography;
const { RangePicker } = DatePicker;
const { Header, Content } = Layout;

const MOCK_DATA: DataEntryType[] = [
    {
        name: 'name',
        type: 'input',
        label: '이름',
        placeholder: 'EX) 홍길동',
        rules: [{
            required: true,
            message: `필수 : 이름 입력`,
        }],
        formController: {
            xs: 12,
        }
    },
    {
        name: 'birth',
        type: 'number',
        label: '생년월일',
        placeholder: '생년월일 6자리 / EX) 781225',
        maxLength: 6,
        rules: [{
            required: true,
            message: `필수 : 생년월일 입력`,
        }],
        formController: {
            xs: 12,
        }
    },
    {
        name: 'phone',
        type: 'number',
        label: '전화번호',
        placeholder: '전화번호 11자리 / EX) 01012345678',
        maxLength: 11,
        rules: [{
            required: true,
            message: `필수 : 전화번호 입력`,
        }],
    },
    {
        name: 'bank',
        type: 'select',
        label: '은행',
        placeholder: '은행 선택',
        rules: [{
            required: true,
            message: `필수 : 이름 입력`,
        }],
        data: [
            {
                label: '국민',
                value: 'rnrals',
            },
            {
                label: '우리',
                value: 'dnfl',
            },
            {
                label: '신한',
                value: 'tlsgks',
            },
            {
                label: '하나',
                value: 'gksk',
            },
        ],
    },
    {
        name: 'bankNumber',
        type: 'number',
        label: '계좌번호',
        placeholder: '"-" 제외한 번호만 입력',
        rules: [{
            required: true,
            message: `필수 : 계좌번호 입력`,
        }],
    },
    {
        name: 'lunchBox',
        type: 'select',
        label: '도시락',
        placeholder: '도시락 선택',
        data: [
            {
                label: '1번 도시락',
                value: '1',
            },
            {
                label: '2번 도시락',
                value: '2',
            },
            {
                label: '3번 도시락',
                value: '3',
            },
            {
                label: '선택안함',
                value: 'nope',
            },
        ],
    },
];

export default function Home() {
    const [form] = Form.useForm();
    const [value, setValue] = useState<string>('');

    const onSubmit = async () => {
        let request = form.getFieldsValue([
            'name',
            'birth',
            'phone',
            'bank',
            'bankNumber',
            'lunchBox',
        ]);

        const encodeData = btoa(JSON.stringify(request));
        setValue(encodeData);
    }

    return (
        <ConfigProvider
            theme={theme}
            componentSize={'large'}
        >
            <Layout>
                <Content
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                        margin: '100px auto 32px',
                        padding: '56px 16px 32px',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        boxShadow: '0 0.5px 8px rgba(0, 0, 0, 0.06), 0 1.5px 10px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <LogoBox />
                    <Form
                        form={form}
                        name="validateOnly"
                        labelCol={{ span : 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onSubmit}
                    >
                        <Flex>
                            <Title level={2}>[DEMO] 예비군 훈련 PASS</Title>
                        </Flex>
                        <Divider orientation="left" plain>
                            기본정보 입력
                        </Divider>
                        <Row
                            gutter={[8, 0]}
                        >
                            {MOCK_DATA.map((item, index) => {
                                const {
                                    name,
                                    label,
                                    rules,
                                    formController,
                                } = item;

                                return (
                                    <Col
                                        key={`input-item-${index}`}
                                        xs={{ span: formController?.xs ? formController.xs : 24 }}
                                    >
                                        <FormItem
                                            name={name}
                                            label={label}
                                            rules={rules}
                                            style={{
                                                margin: '0 0 8px',
                                            }}
                                        >
                                            <DataEntry {...item} />
                                        </FormItem>
                                    </Col>
                                )
                            })}
                        </Row>
                        <Flex
                            justify={'center'}
                            style={{
                                paddingTop: '30px',
                            }}
                        >
                            <SubmitButton form={form}>
                                QR코드 생성
                            </SubmitButton>
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
                    </Form>
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
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background: white;
    z-index: 10;
    box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.03), 0 1.5px 5px rgba(0, 0, 0, 0.06);
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
