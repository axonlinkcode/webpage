import './button.css'

const Button = ({ name, link,className }) => {
    return (
        <a className={`${className}`} href={link}>{name}</a>
    )
}

export default Button
