export interface locationArray {
    location : location[]
}

export interface location {
    value : string,
    label : string
}

type GenericComboBoxProps = {
    data: location[]
    title : string
    duration : location[]
}

export default GenericComboBoxProps;

