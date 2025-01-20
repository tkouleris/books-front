function Display({reading}) {

    function descriptionReducer(description)                {
        if(description.length > 250){
            return reading.book.description.substring(0,250) + '...'
        }else{
            return description
        }

    }

    return <div key={reading.id} className="col-md-12" style={{margin: "5px 5px", border: '1px solid black'}}>
        <div className="row">
            <div className="col-12" style={{
                textAlign: "center",
                backgroundColor: "#0096FF",
                paddingTop: 0,
                paddingBottom: 0
            }}>
                <b>{reading.book.title}</b>
            </div>
            <div className="col-6" style={{paddingLeft: 0}}>
                <img alt={reading.book.title} style={{width: '100%', height: 250}}
                     src={reading.book.image}/>
            </div>
            <div className="col-6">
                {descriptionReducer(reading.book.description)}
            </div>
            <div className="col-12" style={{textAlign: "center"}}>
                <div className="row">
                    <div className="col-6" style={{textAlign: "right"}}><b>Started:</b></div>
                    <div className="col-6" style={{textAlign: "left"}}><span>{reading.started}</span></div>
                </div>
            </div>
            <div className="col-12" style={{textAlign: "center"}}>
                <div className="row">
                    <div className="col-6" style={{textAlign: "right"}}><b>Ended:</b></div>
                    <div className="col-6" style={{textAlign: "left"}}><span>{reading.ended}</span></div>
                </div>

            </div>
        </div>
    </div>
}

export default Display;