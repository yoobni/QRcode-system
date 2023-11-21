'use client';
import React, { ReactNode, useState, useEffect } from "react";
import Image from 'next/image';
import styled from "styled-components";
import {
    Layout,
    Row,
    Col,
    Form,
    Input,
    InputNumber,
    Select,
    Cascader,
    Radio,
    DatePicker,
    Table,
    Tooltip,
    Button,
    notification,
    Divider,
    ConfigProvider,
    Flex,
    QRCode,
    Typography,
} from 'antd';
import type { FormInstance } from 'antd';
import theme from '../../theme/themeConfig';

const { Text, Title, Link } = Typography;
const { RangePicker } = DatePicker;
const { Header, Content, Footer } = Layout;

interface DataEntryDataType {
    label: string;
    value: string | boolean;
    children?: any[];
}

interface DataEntryType {
    name: string;
    type: string;
    label: string;
    placeholder: string | [string, string];
    rules?: any[];
    maxLength?: number;
    data?: DataEntryDataType[];
}

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
    },
    {
        name: 'birth',
        type: 'number',
        label: '생년월일',
        placeholder: '생년월일 6자리 / EX) 781225',
        maxLength: 6,
        rules: [{
            required: true,
            message: `필수 : 이름 입력`,
        }],
    },
    {
        name: 'gender',
        type: 'radio',
        label: '성별',
        placeholder: '생년월일 6자리 / EX) 781225',
        rules: [{
            required: true,
            message: `필수 : 이름 입력`,
        }],
        data: [
            {
                label: '남성',
                value: 'male',
            },
            {
                label: '여성',
                value: 'female',
            },
            {
                label: '기타',
                value: 'other',
            },
        ],
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
        name: 'location',
        type: 'cascader',
        label: '지역',
        placeholder: '지역 선택',
        data: [
            {
                label: '서울특별시',
                value: 'Seoul',
                children: [
                    {
                        label: '동작구',
                        value: 'Dongjak',
                        children: [
                            {
                                label: '노량진동',
                                value: 'Noryang',
                            },
                            {
                                label: '상도동',
                                value: 'Sangdo',
                            },
                            {
                                label: '흑석동',
                                value: 'hs',
                            },
                            {
                                label: '사당동',
                                value: 'Sadang',
                            },
                        ]
                    },
                    {
                        label: '관악구',
                        value: 'Gwanak',
                        children: [
                            {
                                label: '보라매동',
                                value: 'Boramae',
                            },
                            {
                                label: '행운동',
                                value: 'Luckey',
                            },
                            {
                                label: '신림동',
                                value: 'Shinlim',
                            },
                        ],
                    },
                    {
                        label: '금천구',
                        value: 'Geumcheon',
                        children: [
                            {
                                label: '가산동',
                                value: 'Gasan',
                            },
                            {
                                label: '독산동',
                                value: 'Docksan',
                            },
                            {
                                label: '시흥동',
                                value: 'Sihyeong',
                            },
                        ],
                    }
                ]
            },
        ],
    },
    {
        name: 'date',
        type: 'datePicker',
        label: '날짜',
        placeholder: '날짜 입력',
    },
    {
        name: 'range',
        type: 'rangePicker',
        label: '기간',
        placeholder: ['시작 날짜', '종료 날짜'],
    },
    {
        name: 'approve',
        type: 'radioButton',
        label: '개인정보처리동의',
        placeholder: '',
        rules: [
            {
                validator: (_: any, value: boolean) =>  value ? Promise.resolve() : Promise.reject(new Error('개인정보처리동의에 동의해야합니다.')),
            },
        ],
        data: [
            {
                label: '동의합니다.',
                value: true,
            },
            {
                label: '동의하지 않습니다.',
                value: false,
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
            'gender',
            'bank',
            'location',
            'date',
            'range',
            'approve',
        ]);

        const encodeData = btoa(JSON.stringify(request));
        setValue(encodeData);

        console.log(encodeData);
        console.log(atob(encodeData));
        console.log(JSON.parse(atob(encodeData)));
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
                        margin: '100px auto 30px',
                        padding: '60px 30px 30px',
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
                            <Title level={2}>[데모버전] QR코드 데이터 입출력</Title>
                        </Flex>
                        {MOCK_DATA.map((item, index) => {
                            const {
                                name,
                                type = 'input',
                                label,
                                placeholder,
                                rules,
                                maxLength = 100,
                                data = [],
                            } = item;

                            return (
                                <>
                                    {index === 3 && (
                                        <Divider orientation="left" plain>
                                            구분선
                                        </Divider>
                                    )}
                                    <Row
                                        key={`layout-item-${index}`}
                                        gutter={[8, 0]}
                                    >
                                        <Col
                                            xs={{ span: 24 }}
                                        >
                                            <FormItem
                                                name={name}
                                                label={label}
                                                rules={rules}
                                            >
                                                {type === 'input' && (
                                                    <Input
                                                        placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                                                        maxLength={maxLength}
                                                        allowClear
                                                    />
                                                )}
                                                {type === 'number' && (
                                                    <InputNumber
                                                        placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                                                        maxLength={maxLength}
                                                        controls={false}
                                                    />
                                                )}
                                                {type === 'radio' && (
                                                    <Radio.Group
                                                        name={name}
                                                    >
                                                        {data.map((radioItem, radioIndex) => {
                                                            const {
                                                                label,
                                                                value,
                                                            } = radioItem;

                                                            return (
                                                                <Radio
                                                                    key={`radio-item-${radioIndex}`}
                                                                    value={value}
                                                                >
                                                                    {label}
                                                                </Radio>
                                                            )
                                                        })}
                                                    </Radio.Group>
                                                )}
                                                {type === 'select' && (
                                                    <Select
                                                        placeholder={placeholder}
                                                        options={data}
                                                    />
                                                )}
                                                {type === 'cascader' && (
                                                    <Cascader
                                                        placeholder={placeholder}
                                                        options={data}
                                                    />
                                                )}
                                                {type === 'datePicker' && (
                                                    <DatePicker
                                                        placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                                                    />
                                                )}
                                                {type === 'rangePicker' && (
                                                    <RangePicker
                                                        placeholder={typeof placeholder === 'string' ? ['start', 'end'] : placeholder}
                                                    />
                                                )}
                                                {type === 'radioButton' && (
                                                    <Radio.Group
                                                        name={name}
                                                        style={{ width: '100%', }}
                                                    >
                                                        {data.map((radioButtonItem, radioIndex) => {
                                                            const {
                                                                label,
                                                                value,
                                                            } = radioButtonItem;

                                                            return (
                                                                <Radio.Button
                                                                    key={`radio-item-${radioIndex}`}
                                                                    value={value}
                                                                >
                                                                    {label}
                                                                </Radio.Button>
                                                            )
                                                        })}
                                                    </Radio.Group>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })}
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
  
    .ant-input-number {
        width: 100%;
    }
  
    .ant-picker {
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
