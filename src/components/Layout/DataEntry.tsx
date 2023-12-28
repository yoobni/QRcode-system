import React, { memo, } from "react";

import {
    Cascader,
    DatePicker,
    Input,
    InputNumber,
    Radio,
    Select,
} from "antd";

const { RangePicker } = DatePicker;

export interface DataEntryDataType {
    label: string;
    value: string | boolean;
    children?: any[];
}

export interface DataEntryType {
    name: string;
    type: string;
    label: string;
    placeholder: string | [string, string];
    rules?: any[];
    maxLength?: number;
    data?: DataEntryDataType[];
    formController?: {
        xs?: number;
    }
}

const DataEntry = (props: DataEntryType) => {
    const {
        name,
        type = 'text',
        placeholder,
        maxLength = 100,
        data = [],
        ...rest
    } = props;

    switch (type) {
        case 'text':
        case 'tel':
            return (
                <Input
                    {...rest}
                    type={type}
                    placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                    maxLength={maxLength}
                    allowClear
                />
            );
        case 'number':
            return (
                <InputNumber
                    {...rest}
                    placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                    maxLength={maxLength}
                    controls={false}
                    style={{ width: '100%' }}
                />
            );
        case 'radio':
            return (
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
            );
        case 'select':
            return (
                <Select
                    {...rest}
                    placeholder={placeholder}
                    options={data}
                />
            );
        case 'cascader':
            return (
                <Cascader
                    {...rest}
                    placeholder={placeholder}
                    options={data}
                />
            );
        case 'datePicker':
            return (
                <DatePicker
                    {...rest}
                    placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                    style={{ width: '100%', }}
                />
            );
        case 'rangePicker':
            return (
                <RangePicker
                    {...rest}
                    placeholder={typeof placeholder === 'string' ? ['start', 'end'] : placeholder}
                    style={{ width: '100%', }}
                />
            );
        case 'radioButton':
            return (
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
                                key={`${name}-item-${radioIndex}`}
                                value={value}
                            >
                                {label}
                            </Radio.Button>
                        )
                    })}
                </Radio.Group>
            );
        default:
            return <></>;
    }
}

export default memo(DataEntry);