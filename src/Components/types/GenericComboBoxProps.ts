export interface locationArray {
  location: location[];
}

export interface location {
  value: string;
  label: string;
}

type GenericComboBoxProps = {
  data: location[];
  title: string[];
  duration: location[];
  salary: location[];
  postingdate: location[];
  workExp: location[];
  employement: location[];
};

export default GenericComboBoxProps;
