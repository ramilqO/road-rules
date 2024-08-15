import style from './Checkbox.module.scss';

interface CheckboxProps {
  onToggle: () => void;
  label: string;
  defaultChecked: boolean;
}

export default function Checkbox({
  onToggle,
  label,
  defaultChecked,
}: CheckboxProps) {
  return (
    <div className={style.checkbox}>
      <input
        type="checkbox"
        onChange={onToggle}
        className={style.checkbox__inputCheckBox}
        defaultChecked={defaultChecked}
      />
      <label className={style.checkbox__label}>{label}</label>
    </div>
  );
}
