interface FormErrorLabelProps {
  show?: boolean;
  errorText?: string;
}
export const FormErrorLabel: React.FC<FormErrorLabelProps> = ({
  show,
  errorText,
}) => {
  if (!show) {
    return <></>;
  }
  return <p className="text-red-400">{errorText ?? ""}</p>;
};
