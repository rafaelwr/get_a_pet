import styles from './Input.module.css'

const Input = ({
    type, 
    text, 
    name, 
    placeholder,
    handleOnChange,
    value,
    multiple
}) => {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder}
                onChange={handleOnChange}
                {...(multiple ? { multiple } : '')}
            />
        </div>
    )
}

export default Input