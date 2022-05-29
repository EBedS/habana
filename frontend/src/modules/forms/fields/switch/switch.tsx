import Switch, { ReactSwitchProps } from 'react-switch';

export type SwitchFieldProps = Omit<
    ReactSwitchProps,
    'onColor' | 'offColor' | 'height' | 'width' | 'handleDiameter'
>;

const SwitchField: React.FC<SwitchFieldProps> = ({ ...rest }) => (
    <Switch
        handleDiameter={8}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor="#20c933"
        offColor="#333"
        height={10}
        width={18}
        {...rest}
    />
);

export default SwitchField;
