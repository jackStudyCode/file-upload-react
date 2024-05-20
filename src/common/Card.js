function Card(props) {
    return <div className={'border rounded-xl border-gray-200 p-4 my-4'}>
        {props.children}
    </div>;
}

export default Card;