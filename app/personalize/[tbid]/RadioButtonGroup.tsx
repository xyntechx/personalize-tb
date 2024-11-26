import React from 'react';

interface RadioButtonGroupProps {
    options: { label: string; value: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
    name: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
    options,
    selectedValue,
    onChange,
    name,
}) => {
    return (
        <div className="flex flex-row gap-x-4">
            {options.map((option) => (
                <div key={option.value} className="flex items-center gap-x-2">
                    <input
                        type="radio"
                        id={option.value}
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default RadioButtonGroup;