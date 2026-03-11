function MyComponent({name, imgLocation}){
    return(
        <div>
            <h1>{name}</h1>
            <img src={imgLocation}/>
        </div>
    );
}

export default MyComponent