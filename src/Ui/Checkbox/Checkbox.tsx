import style from "./Checkbox.module.scss";

interface CheckboxProps {
  onToggle: () => void;
  label: string;
  defaultChecked?: boolean;
}

export default function Checkbox({
  onToggle,
  label,
  defaultChecked = false,
}: CheckboxProps) {
  return (
    <div className={style.checkbox}>
      <label className={style.wrapper}>
        <input
          type="checkbox"
          onChange={onToggle}
          className={style.checkbox_inputCheckBox}
          defaultChecked={defaultChecked}
        />
        <span className={style.checkbox_inputCheckBoxCustom} />
        <span className={style.checkbox_label}>{label}</span>
      </label>
    </div>
  );
}
