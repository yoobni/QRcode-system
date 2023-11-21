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
        type = 'input',
        placeholder,
        maxLength = 100,
        data = [],
    } = props;

    switch (type) {
        case 'input':
            return (
                <Input
                    placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                    maxLength={maxLength}
                    allowClear
                />
            );
        case 'number':
            return (
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                    maxLength={maxLength}
                    controls={false}
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
                    placeholder={placeholder}
                    options={data}
                />
            );
        case 'cascader':
            return (
                <Cascader
                    placeholder={placeholder}
                    options={data}
                />
            );
        case 'datePicker':
            return (
                <DatePicker
                    style={{ width: '100%', }}
                    placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
                />
            );
        case 'rangePicker':
            return (
                <RangePicker
                    style={{ width: '100%', }}
                    placeholder={typeof placeholder === 'string' ? ['start', 'end'] : placeholder}
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