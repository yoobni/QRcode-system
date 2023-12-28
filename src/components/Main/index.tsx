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
    Radio,
    List,
} from 'antd';
import type { FormInstance } from 'antd';
import theme from '../../theme/themeConfig';
import DataEntry, { DataEntryType, } from "@components/Layout/DataEntry";
import { Footer } from '@components/Template';
import type { RadioChangeEvent } from 'antd';


const { Text, Title, Link } = Typography;
const { RangePicker } = DatePicker;
const { Header, Content } = Layout;

const MOCK_DATA: DataEntryType[] = [
    {
        name: 'name',
        type: 'text',
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
        type: 'tel',
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

const data = [
    {
        name: 'question1',
        title: '현재 앓고 있는 질병이 있습니까?',
    },
    {
        name: 'question2',
        title: '최근 운동 전/후 갑작스런 흉통이나 호흡곤란 등의 증상을 경험한 적이 있습니까?',
    },
    {
        name: 'question3',
        title: '최근 정신과적인 증상(불안, 우울, 수면장애 등)이 있습니까?',
    },
    {
        name: 'question4',
        title: '오늘 몸 상태가 예비군 훈련에 지장을 줍니까? (피로, 건강 이상 등)',
    },
];

export default function Main() {
    const [form] = Form.useForm();
    const [value, setValue] = useState<string>('');

    const onSubmit = async () => {
        let request = form.getFieldsValue();
        let stringRequest = JSON.stringify(request);
        let encodeData = btoa(stringRequest);

        // TODO: add result page
    }

    return (
        <ConfigProvider
            theme={theme}
            componentSize={'large'}
        >
            <Layout
                style={{
                    padding: '10px',
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
                        <img
                            src="/images/logo.png"
                            alt=""
                            style={{
                                width: '85px',
                                height: '85px',
                                borderRadius: '5px',
                            }}
                        />
                    </LogoBox>
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
                        <Divider orientation="left" plain>
                            문진 정보
                        </Divider>

                        {data.map((item, index) => {
                            const {
                                name,
                                title,
                            } = item;

                            return (
                                <QuestionCol key={`problem-item-${index}`}>
                                    <Row
                                        style={{
                                            margin: '0 0 16px',
                                        }}
                                    >
                                        <Text>
                                            {index + 1}. {title}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <FormItem
                                            name={name}
                                            rules={[{
                                                required: true,
                                                validator: async (_, checked) => {
                                                    if (!checked) {
                                                        return Promise.reject(
                                                            new Error("you must accept to deposit 10% of the sale price"),
                                                        );
                                                    }
                                                },
                                            }]}
                                            style={{
                                                margin: '0 0 8px',
                                            }}
                                        >
                                            <Radio.Group
                                                defaultValue="a"
                                                size="middle"
                                                style={{
                                                    display: 'flex',
                                                    width: '80%',
                                                    margin: '0 auto',
                                                }}
                                            >
                                                <Radio.Button
                                                    className={'problem-button'}
                                                    value="true"
                                                >
                                                    예
                                                </Radio.Button>
                                                <Radio.Button
                                                    className={'problem-button'}
                                                    value="false"
                                                >
                                                    아니오
                                                </Radio.Button>
                                            </Radio.Group>
                                        </FormItem>
                                    </Row>
                                </QuestionCol>
                            )
                        })}
                        <QuestionCol>
                            <Row
                                style={{
                                    margin: '0 0 16px',
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: '16px',
                                    }}
                                >
                                    5. 군사보호구역에서의 개인소유 통신장비는 &apos;<b>국방부모바일보안앱</b>&apos;을 설치해야 하며, 부대 내 사진 촬영은 금지됩니다. <br/><b>무단 사용 시 퇴소조치</b> 되며, 이에 어떠한 이의제기도 하지 않을 것을 동의합니다.
                                </Text>
                            </Row>
                            <Row>
                                <Radio.Group
                                    defaultValue="a"
                                    size="middle"
                                    style={{
                                        display: 'flex',
                                        width: '80%',
                                        margin: '0 auto',
                                    }}
                                >
                                    <Radio.Button
                                        className={'problem-button'}
                                        value="true"
                                    >
                                        예
                                    </Radio.Button>
                                    <Radio.Button
                                        className={'problem-button'}
                                        value="false"
                                    >
                                        아니오
                                    </Radio.Button>
                                </Radio.Group>
                            </Row>
                        </QuestionCol>

                        {/*{*/}
                        {/*    name: 'question5',*/}
                        {/*    title: ``,*/}
                        {/*},*/}

                        {/*<List*/}
                        {/*    dataSource={data}*/}
                        {/*    renderItem={(item, index) => (*/}
                        {/*        <Flex*/}
                        {/*            justify={'center'}*/}
                        {/*            style={{*/}
                        {/*                width: '100%',*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <Col>*/}
                        {/*                <List.Item>*/}
                        {/*                    <List.Item.Meta*/}
                        {/*                        title={<a href="https://ant.design">{item.title}</a>}*/}
                        {/*                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"*/}
                        {/*                    />*/}

                        {/*                </List.Item>*/}
                        {/*            </Col>*/}
                        {/*            <Col>*/}
                        {/*                <Radio.Group*/}
                        {/*                    options={optionsWithDisabled}*/}
                        {/*                    onChange={onChange4}*/}
                        {/*                    value={value4}*/}
                        {/*                    optionType="button"*/}
                        {/*                    buttonStyle="solid"*/}
                        {/*                />*/}
                        {/*            </Col>*/}

                        {/*        </Flex>*/}
                        {/*    )}*/}
                        {/*/>*/}


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

    console.log(values);

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
